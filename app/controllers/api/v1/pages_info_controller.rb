class Api::V1::PagesInfoController < ApplicationController
    def show #add route, so start with one action at atime, make sure to add both the params showing what we want Aswell as the params with id/etc
        if params[:homepage]
            servers = Server.all.length
            users = User.all.length
            render json: {servers: servers, users: users}
        end
    end
end
