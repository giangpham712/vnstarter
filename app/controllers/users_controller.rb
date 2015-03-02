class UsersController < ApplicationController
  def login
  end

  def register
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      redirect_to url_for(:controller => 'home')
    else
      render 'register'
    end
  end

  def logout
  end

  private
    def user_params
      params.require(:user).permit(:name, :email, :email_confirmation, :password, :password_confirmation)
    end

end
