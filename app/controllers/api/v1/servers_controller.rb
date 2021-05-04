class Api::V1::ServersController < ApplicationController
    #use serializer later when using image attachment
    def index
        @servers = Server.all
    end

    def show
    end

    def create
    end

    def delete
    end
end
