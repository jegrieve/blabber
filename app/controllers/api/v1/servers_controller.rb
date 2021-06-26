class Api::V1::ServersController < ApplicationController
    #use serializer later when using image attachment
    def index
        servers = Server.all.order(created_at: :asc).offset(params[:offset_num]).limit(5)
        if servers
        render json: servers
        end
    end

    def show
        server = Server.find(params[:id])
        if server
            render json: server
        end
    end

    def create
        user = User.find_by(id: session[:user_id])
        server = user.servers.new(server_params)
        if server.save
            render json: server
        else
            render json: server.errors
        end
    end

    def update
        server = Server.find(params[:id])
        if server && params[:server_image]
            server.update(server_image: params[:server_image])
            render json: server
        elsif server && params[:info]
            server.update(info: params[:info])
            render json: server
        end
    end

    def delete
    end

    private
    def server_params
        params.permit(:name, :info, :server_image)
    end
end
