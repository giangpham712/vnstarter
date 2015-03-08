class ProjectsController < ApplicationController
  before_action :authenticate_user!, :except => [:index, :show]
  skip_before_filter :verify_authenticity_token, :only => [:upload_image]

  def index

  end

  def show
    @project = Project.includes(:user).find(1)

  end

  def new
    @project = Project.new
  end

  #View to create a new project
  def create
    @project = Project.new(project_params)
    @user = current_user
    @project.creator_id = @user.id
    if @project.save
      redirect_to edit_project_path(@project)
    else
      render 'new'
    end
  end

  #View to edit an existing project
  def edit
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

    if @project.update_attributes(:image => params[:image])
      render json: { :success => true }
    else
      render json: { :success => false }
    end

  end

  private
    def project_params
      params.require(:project).permit(:title, :location, :short_description, :funding_goal, :image)
    end
end
