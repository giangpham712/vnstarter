class Api::PostsController < ApplicationController

  skip_before_filter :verify_authenticity_token, :only => [:create, :update, :destroy]

  respond_to :json

  def create
    project = Project.find(params[:project_id])
    post = project.posts.build(post_params)

    if post.save
      project_id = params[:project_id]
      Rails.cache.delete("projects/#{project_id}/posts/all")
      Rails.cache.delete(fragment_cache_key("projects/#{project_id}/posts/all"))
      render json: { :post => post }
    else
      render json: { :post => post.as_json.merge({ :errors => post.errors.full_messages }) }, :status => 200
    end

  end

  def update
    post = Post.find(params[:id])
    post.assign_attributes(post_params)

    if post.save
      project_id = params[:project_id]
      Rails.cache.delete("projects/#{project_id}/posts/all")
      Rails.cache.delete(fragment_cache_key("projects/#{project_id}/posts/all"))
      render json: { :post => post.as_json }
    else
      render json: { :post => post.as_json.merge({ :errors => post.errors.full_messages }) }, :status => 200
    end

  end

  def destroy
    post = Post.find(params[:id])

    if post.destroy
      project_id = params[:project_id]
      Rails.cache.delete("projects/#{project_id}/posts/all")
      Rails.cache.delete(fragment_cache_key("projects/#{project_id}/posts/all"))
      head :no_content
    else
      render json: { :errors => post.errors.full_messages }
    end
  end

  private
    def post_params
      json_params = ActionController::Parameters.new( JSON.parse(request.body.read) )
      json_params.require(:post).permit(:title, :body, :image)
    end

end