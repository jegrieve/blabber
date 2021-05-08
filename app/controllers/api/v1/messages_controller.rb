class Api::V1::MessagesController < ApplicationController
    def index
        messages = Channel.find(params[:id]).messages.order(created_at: :desc)
        if messages
            render json: messages
        end
    end

    def create
        user = User.find_by(id: session[:user_id])
        message = user.messages.new(message_params)
        message.channel_id = params[:id]
        if message.save
            render json: message
        end
    end

    private

    def message_params
        params.permit(:body)
    end
end
