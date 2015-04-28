class Api::RewardsController < ApplicationController

  skip_before_filter :verify_authenticity_token, :only => [:create, :update, :destroy]

  respond_to :json

  def create
    project = Project.find(params[:project_id])
    reward = project.rewards.build(reward_params)

    if reward.save
      project_id = params[:project_id]
      Rails.cache.delete("projects/#{project_id}/rewards/all")
      Rails.cache.delete(fragment_cache_key("projects/#{project_id}/rewards/all"))
      render json: { :reward => reward }
    else
      render json: { :reward => reward.as_json.merge({ :errors => reward.errors.full_messages }) }, :status => 200
    end

  end

  def update
    reward = Reward.find(params[:id])
    reward.assign_attributes(reward_params)

    if reward.save
      project_id = params[:project_id]
      Rails.cache.delete("projects/#{project_id}/rewards/all")
      Rails.cache.delete(fragment_cache_key("projects/#{project_id}/rewards/all"))
      render json: { :reward => reward.as_json }
    else
      render json: { :reward => reward.as_json.merge({ :errors => reward.errors.full_messages }) }, :status => 200
    end

  end

  def destroy
    reward = Reward.find(params[:id])

    if reward.destroy
      project_id = params[:project_id]
      Rails.cache.delete("projects/#{project_id}/rewards/all")
      Rails.cache.delete(fragment_cache_key("projects/#{project_id}/rewards/all"))
      head :no_content
    else
      render json: { :errors => reward.errors.full_messages }
    end
  end

  private
    def reward_params
      json_params = ActionController::Parameters.new( JSON.parse(request.body.read) )
      json_params.require(:reward).permit(:minimum_pledge_amount, :description, :limit_quantity)
    end


end
