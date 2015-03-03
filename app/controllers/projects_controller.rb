class ProjectsController < ApplicationController
  before_action :authenticate_user!, :except => [:index]

  def index

  end

  def show
    @project = Project.friendly.find(params[:id])
  end

  def new
    @project = Project.new
  end

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

  def edit
    @project = Project.friendly.find(params[:id])
  end

  private
    def project_params
      params.require(:project).permit(:title, :location)
    end
end
