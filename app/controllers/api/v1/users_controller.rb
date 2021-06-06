class Api::V1::UsersController < ApplicationController
    def show
        user = User.find(params[:id])
        if user
            render json: user
        end
    end

    def destroy
    end

    def update
    end
end
