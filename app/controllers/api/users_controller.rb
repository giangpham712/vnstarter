class Api::UsersController < ApplicationController

  skip_before_filter :verify_authenticity_token, :only => [:update, :upload_avatar]

  def update

    if current_user.id != params[:id]

    end

    user = User.find(params[:id])

    user.assign_attributes(update_user_params)

    if user.save
      render json: { :user => user }
    else
      render json: { :user => user.as_json.merge({ :errors => user.errors.full_messages }) }, :status => 200
    end
  end

  def upload_avatar
    user = current_user

    if user.update_attributes(:avatar => params[:user][:avatar])
      render json: { :image_url => user.avatar_url(:standard) }
    else
      render json: { :errors => user.errors }
    end

  end

  private
    def update_user_params
      json_params = ActionController::Parameters.new( JSON.parse(request.body.read) )
      json_params.require(:user).permit(:name, :biology, :location, :website)
    end

end
