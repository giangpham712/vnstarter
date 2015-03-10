class CommentsController < ApplicationController

  def create
    @project = Project.friendly.find(params[:project_id])
    @comment = @project.comments.build(comment_params)

    @user = current_user
    @comment.commenter_id = @user.id

    if @comment.save
      render json: { :success => true }
    else
      render json: { :success => false, :errors => @comment.errors }
    end

  end

  private
    def comment_params
      params.require(:comment).permit(:body)
    end

end
