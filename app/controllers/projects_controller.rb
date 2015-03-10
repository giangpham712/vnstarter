class ProjectsController < ApplicationController
  before_action :authenticate_user!, :except => [:index, :show]
  skip_before_filter :verify_authenticity_token, :only => [:upload_image]

  def index
    @projects = Project.all
  end

  def show
    @project = Project.includes(:user).friendly.find(params[:id])
    pledges = @project.pledges

    @total_pledgers = pledges.count(:pledger_id, :distinct => true)

    @total_pledge_amount = pledges.sum(:pledge_amount)

    render 'show'
  end

  def new
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
      render json: { :success => false, :errors => @project.errors }
    end

  end

  private
    def project_params
      params.require(:projects).permit(:title, :location, :short_description, :funding_goal, :image)
    end
end
