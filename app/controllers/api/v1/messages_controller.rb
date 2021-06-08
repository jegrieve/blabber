class Api::V1::MessagesController < ApplicationController
    def index
        messages = Message.where(channel_id: params[:channel_id]).order(created_at: :asc)
        #.limit(10)
            #Channel.find(params[:channel_id]).messages.order(created_at: :asc)
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

    
    def destroy
        message = Message.find(params[:id])
        if (session[:user_id] && session[:user_id] === message.user_id)
            message.destroy
            render json: {message: "Message deleted"}
        end
    end

    def update
        message = Message.find(params[:id])
        if message
            message.update(body: params[:body], video_link: params[:video_link], message_image: params[:message_image])
            render json: message
        end
    end

    private

    def message_params
        params.permit(:body, :message_image, :video_link)
    end
end
