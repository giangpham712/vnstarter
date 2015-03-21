class MessagesController < ApplicationController

  def new
    @message = Message.new
  end

  def index
    
  end

  def show

  end

  def create
    @message = Message.new(message_params)
    @user = current_user
    @message.sender_id = @user.id

    if @project.save
      redirect_to message_path(@message)
    else
      render 'new'
    end

  end

    private
      def message_params
        params.require(:message).permit(:body, :receiver_id)
      end
end
