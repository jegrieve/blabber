class Api::V1::ServersController < ApplicationController
    #use serializer later when using image attachment
    def index
        servers = Server.all.offset(params[:offset_num]).limit(15)
        # servers = Server.all
        render json: servers
    end

    def show
        server = Server.find(params[:id])
        if server
            render json: server
        end
    end

    def create
        user = User.find_by(id: session[:user_id])
        server = user.servers.create(server_params)
        render json: server
    end

    def delete
    end

    private
    def server_params
        params.permit(:name, :info)
    end
end
