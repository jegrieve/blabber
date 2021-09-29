class Api::V1::ChannelsController < ApplicationController
    def index
        channels = Server.find(params[:server_id]).channels.offset(params[:offset_num]).limit(7);
        if channels
        render json: channels
        end
    end

    def show
        channel = Channel.find(params[:id])
        if channel
            render json: channel
        end
    end

    def create
        server = Server.find(params[:server_id])
        channel = server.channels.new(channel_params)
        if channel.save
            render json: channel
        else
            render json: channel.errors
        end
    end

    def update
        channel = Channel.find(params[:id])
        if channel
            channel.update(name: params[:name], colour: params[:colour])
            render json: channel
        end
    end

    def destroy
        channel = Channel.find(params[:id])
        if (session[:user_id] && session[:user_id] === channel.server.user_id)
            channel.destroy
            render json: {message: "Channel deleted"}
        end
    end

    private
    def channel_params
        params.permit(:name, :colour)
    end
end
