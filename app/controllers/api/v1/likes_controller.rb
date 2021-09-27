class Api::V1::LikesController < ApplicationController
    def create
        user = User.find_by(id: session[:user_id])
        like = user.likes.new
        like.server_id = params[:server_id]
        like.save
        render json: like
    end

    def destroy
        user = User.find_by(id: session[:user_id])
        server = user.likes.find_by(server_id: params[:id])
        server.destroy
        render json: {message: 'Unfavourited this server'}
    end
end
