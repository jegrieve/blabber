class Api::V1::ChannelsController < ApplicationController
    def show
        channel = Channel.find(params[:id])
        if channel
            render json: channel
        end
    end

    def create
        server = Server.find(:id)
        channel = server.channels.create(channel_params)
        render json: channel
    end

    private
    def channel_params
        params.permit(:name, :id)
    end
end
