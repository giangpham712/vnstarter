class UsersController < ApplicationController

  def show
    if (params[:id])
      @user = User.find(params[:id])
    else
      @user = current_user
    end

  end

  def edit
    user = current_user
  end

  def update_profile
    user = current_user
    if user.update(update_profile_params)
      render json: { :success => true, :user => user }
    else
      render json: { :success => false, :user => user.errors.values }
    end

  end

  private
    def update_profile_params
      params.require(:user).permit(:name, :biology, :location, :website)
    end

end
