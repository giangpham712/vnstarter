class CommentsController < ApplicationController

  def create
    @project = Project.friendly.find(params[:project_id])
    @comment = @project.comments.build(comment_params)

    @user = current_user
    @comment.commenter_id = @user.id

    if @comment.save
      redirect_to project_path(@project)
    else
      redirect_to project_path(@project)
    end

  end

  private
    def comment_params
      params.require(:comment).permit(:body)
    end

end
