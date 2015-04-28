class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_filter :configure_permitted_parameters, if: :devise_controller?
  before_filter :init_gon_data

  def after_sign_in_path_for(user)
    params[:then] || root_path
  end

  def init_gon_data
    if current_user
      gon.current_user = current_user.as_json(:only => [:email, :id, :name, :biology, :location, :website]).merge({:image_url => current_user.avatar_url(:thumbnail)})
    end

    gon.cities = Rails.cache.fetch("cities/all", expires_in: 30.days) do
      City.all.map { |city| city.name }
    end

    gon.categories = Rails.cache.fetch("categories/all", expires_in: 30.days) do
      Category.all.order(:name).to_a
    end
  end

  protected

    def configure_permitted_parameters
      devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:name, :email, :email_confirmation, :password, :password_confirmation) }
    end

end
