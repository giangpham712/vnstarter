class RewardsController < ApplicationController

  def new

  end

  def create
    project = Project.friendly.find(params[:project_id])
    reward = project.rewards.build(reward_params)

    if reward.save
      render json: { :success => true, :reward => reward }
    else
      render json: { :success => false, :errors => reward.errors.full_messages }
    end

  end

  def destroy
    reward = Reward.find(params[:id])

    if reward.destroy
      render json: { :success => true }
    else
      render json: { :success => false, :errors => reward.errors.full_messages }
    end
  end

  private
    def reward_params
      params.require(:reward).permit(:minimum_pledge_amount, :description, :limit_quantity)
    end
end
