class ProjectsController < ApplicationController
  before_action :authenticate_user!, :except => [:index, :show]
  skip_before_filter :verify_authenticity_token, :only => [:upload_image]

  def index
    @projects = Project.all
  end

  def search

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
      render 'new'
    end
  end

  #View to edit an existing projects
  def edit
    @cities = City.all
    @project = Project.friendly.find(params[:id])
  end


  def update
    @project = Project.friendly.find(params[:id])

    if @project.update(project_params)
      redirect_to edit_project_path(@project)
    else
      render 'edit'
    end
  end

  def upload_video


  end

  def upload_image
    @project = Project.friendly.find(params[:id])
    puts params[:image]
    if @project.update_attributes(:image => params[:project][:image])
      render json: { :success => true, :image_url => @project.image.url }
    else
      render json: { :success => false, :errors => @project.errors }
    end

  end

  private
    def project_params
      params.require(:project).permit(:title, :location, :short_description, :funding_goal, :image)
    end
end
