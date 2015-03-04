class ProjectsController < ApplicationController
  before_action :authenticate_user!, :except => [:index]
  skip_before_filter :verify_authenticity_token, :only => [:upload_image]

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

  def update
    @project = Project.friendly.find(params[:id])

    if @project.update(article_params)
      redirect_to @article
    else
      render 'edit'
    end
  end

  def upload_image
    @upload = params[:upload]
    puts @upload
    puts "Upload image"
    render json: { :project => "Hello world" }
  end

  private
    def project_params
      params.require(:project).permit(:title, :location)
    end
end
