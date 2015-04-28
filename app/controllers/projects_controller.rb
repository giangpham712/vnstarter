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

    if @project.deleted? || (!my_project?(@project) && @project.initiating?)
      redirect_to root_path

    else
      @pledges = @project.pledges

      render 'show'
    end

  end

  def new
    @cities = City.all

    @categories = Category.all

    @project = Project.new()

  end

  #View to create a new projects
  def create
    project = Project.new(project_params)
    user = current_user
    project.creator_id = user.id
    project.funding_goal = 1000000
    project.duration = 10

    if project.save
      redirect_to edit_project_path(project.id)
    else
      @cities = City.all
      @categories = Category.all
      @project = project
      @project.category_id = params[:project][:category_id]
      @project.location = params[:project][:location]
      render 'new'
    end
  end

  #View to edit an existing projects
  def edit
    @cities = Rails.cache.fetch("cities/all", expires_in: 30.days) do
        City.all
    end

    project = Project.find(params[:id])

    if project.deleted? || !my_project?(project)
      redirect_to root_path
    end

    if project.duration_type == "duration"
      project.deadline = Time.zone.now
      project.duration = project.duration || 1
    else
      project.duration = 0
    end

    gon.project = project.as_json.merge(
        {
            :image_url => project.image_url(:medium),
            :deadline => project.deadline.strftime("%d-%m-%Y"),
            :user => project.user.as_json(:only => [:email, :id, :name, :biology, :location, :website]).merge({:image_url => project.user.avatar_url(:standard)}),
            :rewards => Rails.cache.fetch("projects/#{project.id}/rewards/all", expires_in: 30.days) do
              Reward.where("project_id = :project_id", { project_id: project.id }).map { |reward| reward.as_json }
            end,
            :posts => Rails.cache.fetch("projects/#{project.id}/posts/all", expires_in: 30.days) do
              Post.where("project_id = :project_id", { project_id: project.id }).map { |post| post.as_json.merge({:image_url => post.image_url(:medium)}) }
            end
        }
    )

    @project = project
  end


  def launch_project

    project = Project.find(params[:id])

    render json: {:success => false} if project.deleted?
    render json: {:success => false} if project.launched?
    render json: {:success => false} if project.stopped?

    launched_at = Time.zone.now
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
        :launched_at => launched_at,
        :deadline => deadline,
        :duration => duration)
      render json: {:success => true}
    else
      render json: {:success => false, :errors => project.errors}
    end

  end

  def stop_project

    project = Project.find(params[:id])

    render json: {:success => false} if project.deleted?
    render json: {:success => false} if !project.launched?
    render json: {:success => false} if project.stopped?

    if project.update_attributes(:stopped_at => Time.zone.now)
      render json: {:success => true}
    else
      render json: {:success => false, :errors => project.errors}
    end

  end

  def upload_image
    project = Project.find(params[:id])
    puts params[:image]
    if project.update_attributes(:image => params[:project][:image])
      render json: {:success => true, :image_url => project.image_url(:medium)}
    else
      render json: {:success => false, :errors => project.errors}
    end
  end

  private
    def my_project?(project)
      return current_user && project.creator_id == current_user.id
    end

    def project_params
      params.require(:project).permit(:title, :location, :category_id, :short_description, :funding_goal, :duration_type, :duration, :deadline, :image)
    end

    def launched_project_params
      params.require(:project).permit(:title, :location, :category_id, :short_description, :image)
    end

end
