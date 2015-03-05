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

  def update
    @project = Project.friendly.find(params[:id])

    if @project.update(project_params)
      redirect_to edit_project_path(@project)
    else
      render 'edit'
    end
  end

  def upload_image
    upload = params[:upload]

    file_path = Rails.root.join('public', 'uploads', upload.original_filename)
    File.open(file_path, 'wb') do |file|
      file.write(upload.read)
    end

    puts "File uploaded #{file_path}"

    render json: { :file_path => file_path }
  end

  private
    def project_params
      params.require(:project).permit(:title, :location, :short_description, :funding_goal)
    end
end
