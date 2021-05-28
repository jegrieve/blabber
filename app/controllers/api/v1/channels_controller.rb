class Api::V1::ChannelsController < ApplicationController
    def index
        channels = Server.find(params[:server_id]).channels.offset(params[:offset_num]).limit(2);
        # servers = Server.all.offset(params[:offset_num]).limit(15)
        # servers = Server.all
        render json: channels
    end

    def show
        channel = Channel.find(params[:id])
        if channel
            render json: channel
        end
    end

    def create
        server = Server.find(params[:server_id])
        channel = server.channels.create(channel_params)
        render json: channel
    end

    private
    def channel_params
        params.permit(:name)
    end
end
