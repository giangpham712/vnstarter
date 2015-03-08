class PostsController < ApplicationController

  def new

  end

  def index

  end

  def show
    @post = Post.find(params[:id])

  end

  def create
    @project = Project.friendly.find(params[:project_id])
    @post = @project.posts.create(post_params)
    redirect_to project_path(@project)
  end

  private
    def post_params
      params.require(:post).permit(:title, :body)
    end

end
