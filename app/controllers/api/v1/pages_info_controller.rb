class Api::V1::PagesInfoController < ApplicationController
    def show 
        if params[:homepage]
            servers = Server.all.length
            users = User.all.length
            render json: {servers: servers, users: users}
        elsif params[:user_id]
            server_activity = User.find(params[:user_id]).messages.last.channel.server
            if server_activity
                render json: server_activity
            end
        end
    end
end
