class Api::V1::ServersController < ApplicationController
    #use serializer later when using image attachment
    def index
        servers = Server.all
        render json: servers
    end

    def show
        server = Server.find(params[:id])
        if server
            render json: server
        end
    end

    def create
    end

    def delete
    end
end
