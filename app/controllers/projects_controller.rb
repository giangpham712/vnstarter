class ProjectsController < ApplicationController
  before_action :authenticate_user!, :except => [:index, :show, :new]
  skip_before_filter :verify_authenticity_token, :only => [:upload_image]

  def index
    @projects = Project.where(launched_at: nil, deleted_at: nil, stopped_at: nil)

  end

  def about

  end

  def my
    @projects = Project.where(user: current_user)
  end

  def search
    search_key = params[:search_key]

  end

  def show
    @project = Project.includes(:user).friendly.find(params[:id])

    if !@project.launched? || @project.stopped? || @project.deleted?
      redirect_to root_path

    else
      pledges = @project.pledges

      @total_pledgers = pledges.count(:pledger_id, :distinct => true)
      @total_pledge_amount = pledges.sum(:pledge_amount)

      render 'show'
    end

  end

  def new
    @cities = City.all

    @categories = Category.all

    @project = Project.new
  end

  #View to create a new projects
  def create
    project = Project.new(project_params)
    user = current_user
    project.creator_id = user.id
    project.funding_goal = 0
    if project.save
      redirect_to edit_project_path(project)
    else
      @cities = City.all
      @categories = Category.all
      render 'new'
    end
  end

  #View to edit an existing projects
  def edit
    @cities = City.all
    @categories = Category.all

    @project = Project.friendly.find(params[:id])

    if @project.initiating?

      if @project.deadline == nil
        @project.deadline = Time.zone.now
        @project.duration_type = "duration"
      else
        @project.duration = 0
        @project.duration_type = "deadline"
      end

    end

    if (@project.creator_id != current_user.id)
      redirect_to root_path
    end

  end

  def update
    project = Project.friendly.find(params[:id])
    params = project.launched ? launched_project_params : project_params

    if project.initiating?

      case params[:duration_type]
        when "duration"
          params[:deadline] = nil
        when "deadline"
          params[:duration] = 0
        else
          params[:deadline] = nil
          params[:duration] = 0
      end

      params[:funding_goal] = params[:funding_goal].tr('.', '')

    end

    if project.update(params)
      render json: {:success => true, :project => project}
    else
      render json: {:success => false, :errors => project.errors}
    end
  end

  def launch_project

    project = Project.friendly.find(params[:id])

    render json: {:success => false} if project.deleted?
    render json: {:success => false} if project.launched?
    render json: {:success => false} if project.stopped?

    launched_at = Time.now
    deadline = nil
    duration = nil

    if project.deadline == nil
      duration = project.duration
      deadline = launched_at + duration.days
    else
      deadline = project.deadline
      duration = (deadline - launched_at).to_i / 1.day
    end

    if project.update_attributes(
        :launched => true,
        :launched_at => Time.now.utc,
        :deadline => deadline,
        :duration => duration)
      render json: {:success => true}
    else
      render json: {:success => false, :errors => project.errors}
    end

  end

  def stop_project

    project = Project.friendly.find(params[:id])

    render json: {:success => false} if project.deleted?
    render json: {:success => false} if !project.launched?
    render json: {:success => false} if project.stopped?

    if project.update_attributes(:stopped_at => Time.now.utc)
      render json: {:success => true}
    else
      render json: {:success => false, :errors => project.errors}
    end

  end

  def upload_video

  end

  def upload_image
    project = Project.friendly.find(params[:id])
    puts params[:image]
    if project.update_attributes(:image => params[:project][:image])
      render json: {:success => true, :image_url => project.image.url(:medium)}
    else
      render json: {:success => false, :errors => project.errors}
    end

  end

  private
  def project_params
    params.require(:project).permit(:title, :location, :category_id, :short_description, :funding_goal, :duration_type, :duration, :deadline, :image)
  end

  def launched_project_params
    params.require(:project).permit(:title, :location, :category_id, :short_description, :image)
  end

end
