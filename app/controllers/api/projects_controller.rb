class Api::ProjectsController < ApplicationController

  skip_before_filter :verify_authenticity_token, :only => [:update, :execute]

  respond_to :json

  def index
    projects = Project.all
    respond_with projects
  end

  def show
    project = Project.find(params[:id])
    respond_with project
  end

  def update
    project = Project.find(params[:id])
    user = current_user

    params = project.launched ? launched_project_params : project_params

    project.assign_attributes(params)
    user.assign_attributes(project_user_params[:user])

    begin
      project.transaction do
        project.save!
        user.save!
      end
      render json: {:project => project.as_json.merge({ :user => user.as_json(:only => [:email, :id, :name, :biology, :location, :website]).merge({:image_url => user.avatar_url(:standard)}),})}
    rescue ActiveRecord::RecordInvalid => exception
      render json: {:project => project.as_json.merge({ :user => user.as_json(:only => [:email, :id, :name, :biology, :location, :website]).merge({:image_url => user.avatar_url(:standard), :errors => user.errors}),
                                                        :errors => project.errors })}, :status => 200
    end
  end

  def execute
    project = Project.find(params[:id])
    operation = params[:operation]

    case operation
      when "launch"
        launch_project(project)
      when "stop"

      else

    end
  end

  protected
  def launch_project(project)

    if project.deleted? || project.launched? || project.stopped?
      render json: {:project => project}
    end

    current_time = Time.zone.now
    deadline = nil
    duration = nil

    if project.duration_type == "duration"
      duration = project.duration
      deadline = current_time + duration.days
    else
      deadline = project.deadline
      duration = (deadline - current_time).to_i / 1.day
    end

    deadline = deadline.change(hour: 23, min: 59, sec: 59)

    if project.update_attributes(
        :launched => true,
        :launched_at => current_time,
        :deadline => deadline,
        :duration => duration
    )
      render json: { :project => project }
    else
      render json: { :project => project.as_json.merge({:errors => project.errors}) }
    end


  end

  private
  def project_params
    json_params = ActionController::Parameters.new(JSON.parse(request.body.read))
    json_params.require(:project).permit(:title, :location, :category_id, :short_description, :funding_goal, :duration_type, :duration, :deadline, :image)
  end

  def project_user_params
    json_params = ActionController::Parameters.new(JSON.parse(request.body.read))
    json_params.require(:project).permit(:user => [:name, :biology, :location, :website])
  end

  def launched_project_params
    json_params = ActionController::Parameters.new(JSON.parse(request.body.read))
    json_params.require(:project).permit(:title, :location, :category_id, :short_description, :image, :user)
  end

end
