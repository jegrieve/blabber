class Api::V1::PagesInfoController < ApplicationController
    def show 
        if params[:homepage]
            servers = Server.all.length
            users = User.all.length
            render json: {servers: servers, users: users}
        end
    end
end
