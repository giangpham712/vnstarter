class MessagesController < ApplicationController

  def new
    @message = Message.new
  end

  def my
    @received_messages = Message.where(receiver_id: current_user.id)

    @sent_messages = Message.where(sender_id: current_user.id)
  end

  def show

  end

  def create
    message = Message.new(message_params)
    message.sender_id = current_user.id

    if message.save
      render json: {:success => true, :message => message}
    else
      render json: {:success => false, :errors => message.errors.full_messages}
    end

  end

    private
      def message_params
        params.require(:message).permit(:body, :receiver_id)
      end
end
