class UsersController < ApplicationController

  def show
    @user = current_user
  end

  def upload_image
    user = current_user

    if user.update_attributes(:image => params[:image])
      render json: { :success => true, :image_url => user.image.url(:small) }
    else
      render json: { :success => false, :errors => user.errors }
    end

  end

end
