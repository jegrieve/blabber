class Api::V1::MessagesController < ApplicationController
    def index
        messages = Channel.find(params[:id]).messages.order(created_at: :desc)
        if messages
            render json: messages
        end
    end
end
