class UsersController < ApplicationController



  def show
    if (params[:id])
      @user = User.find(params[:id])
    else
      @user = current_user
    end

  end

  def upload_image
    user = current_user

    if user.update_attributes(:image => params[:image])
      render json: { :success => true, :image_url => user.image.url(:small) }
    else
      render json: { :success => false, :errors => user.errors }
    end

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
