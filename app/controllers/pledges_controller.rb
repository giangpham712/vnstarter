class PledgesController < ApplicationController

  def new
    @project = Project.friendly.find(params[:project_id])
    @pledge = @project.pledges.new
  end

  def create
    @project = Project.friendly.find(params[:project_id])
    @pledge = @project.pledges.build(pledge_params)

    @user = current_user
    @pledge.pledger_id = @user.id

    if @pledge.save
      render json: { :success => true, :pledge => @pledge }
    else
      render json: { :success => false }
    end

  end

  private
    def pledge_params
      params.require(:pledge).permit(:pledge_amount)
    end
end
