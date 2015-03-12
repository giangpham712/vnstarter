class ProjectsController < ApplicationController
  before_action :authenticate_user!, :except => [:index, :show]
  skip_before_filter :verify_authenticity_token, :only => [:upload_image]

  def index
    @projects = Project.all
  end

  def search
    search_key = params[:search_key]

  end

  def show
    @project = Project.includes(:user).friendly.find(params[:id])

    pledges = @project.pledges

    @total_pledgers = pledges.count(:pledger_id, :distinct => true)

    @total_pledge_amount = pledges.sum(:pledge_amount)

    render 'show'

  end

  def new
    @cities = City.all

    @categories = Category.all
    
    @project = Project.new
  end

  #View to create a new projects
  def create
    @project = Project.new(project_params)
    user = current_user
    @project.creator_id = user.id
    if @project.save
      redirect_to edit_project_path(@project)
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
  end

  def update
    project = Project.friendly.find(params[:id])
    params = project.launched ? launched_project_params : project_params

    if project.update(params)
      render json: { :success => true, :project => project }
    else
      render json: { :success => false, :errors => project.errors }
    end
  end

  def launch_project

    project = Project.friendly.find(params[:id])

    render json: { :success => false } if project.deleted?
    render json: { :success => false } if project.launched?
    render json: { :success => false } if project.stopped?

    if project.update_attributes(:launched => true, :launched_at => Time.now.utc)
      render json: { :success => true }
    else
      render json: { :success => false, :errors => project.errors }
    end

  end

  def stop_project

    project = Project.friendly.find(params[:id])

    render json: { :success => false } if project.deleted?
    render json: { :success => false } if !project.launched?
    render json: { :success => false } if project.stopped?

    if project.update_attributes(:stopped_at => Time.now.utc)
      render json: { :success => true }
    else
      render json: { :success => false, :errors => project.errors }
    end

  end

  def upload_video

  end

  def upload_image
    project = Project.friendly.find(params[:id])
    puts params[:image]
    if project.update_attributes(:image => params[:project][:image])
      render json: { :success => true, :image_url => project.image.url }
    else
      render json: { :success => false, :errors => project.errors }
    end

  end

  private
    def project_params
      params.require(:project).permit(:title, :location, :category_id, :short_description, :funding_goal, :duration, :dead_line, :image)
    end

    def launched_project_params
      params.require(:project).permit(:title, :location, :category_id, :short_description, :image)
    end

end
