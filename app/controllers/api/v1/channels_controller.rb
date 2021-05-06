class Api::V1::ChannelsController < ApplicationController
    def show
        channel = Channel.find(params[:id])
        if channel
            render json: channel
        end
    end
end
