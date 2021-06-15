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
        user = User.find(params[:id])
        if user && params[:user_image]
            user.update(user_image: params[:user_image])
            render json: user
        elsif user && params[:bio]
            user.update(bio: params[:bio])
            render json: user   
        end
    end
end
