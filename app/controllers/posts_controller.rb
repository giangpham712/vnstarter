class PostsController < ApplicationController

  def new

  end

  def index

  end

  def show
    @post = Post.find(params[:id])

  end

  def create
    project = Project.friendly.find(params[:project_id])
    post = project.posts.build(post_params)

    if post.save
      render json: { :success => true, :post => post }
    else
      render json: { :success => false, :errors => post.errors.full_messages }
    end
  end

  private
    def post_params
      params.require(:post).permit(:title, :body)
    end

end
