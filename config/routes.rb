Rails.application.routes.draw do
  default_url_options :host => "localhost:3000"
  #change before pushing to production
  #missing host to linkto! error when GET images
  namespace :api do 
    namespace :v1 do
      post 'registrations/create', to: 'registrations#create';

      get 'sessions/index', to: 'sessions#index';
      post 'sessions/create', to: 'sessions#create';
      delete 'sessions/destroy/:id', to: 'sessions#destroy';

      get 'servers/index', to: 'servers#index';
      get 'servers/show/:id', to: 'servers#show';
      post 'servers/create', to: 'servers#create';
      patch 'servers/update/:id', to: 'servers#update'
      delete 'servers/destroy/:id', to: 'servers#destroy';

      get 'channels/index', to: 'channels#index';
      get 'channels/show/:id', to: 'channels#show';
      post 'channels/create', to: 'channels#create';

      get "messages/index", to: "messages#index"
      post 'messages/create/:id', to: 'messages#create';
      delete 'messages/destroy/:id', to: 'messages#destroy';
      patch 'messages/update/:id', to: 'messages#update'

      get 'users/show/:id', to: 'users#show'
      delete 'users/destroy/:id', to: 'users#destroy'
      patch 'users/update/:id', to: 'users#update'
    end
  end
  root 'homepage#index'
  get '/channel/*path' => 'homepage#index'
  get '/server/*path' => 'homepage#index'
  get '/create-new-server' => 'homepage#index'
  get '/create-new-channel' => 'homepage#index'
  get '/sign-in' => 'homepage#index'
  get '/sign-up' => 'homepage#index'
  get '/user/*path' => 'homepage#index'
  get '/help' => 'homepage#index'
  # get '/*path' => 'homepage#index'
  #When using /*path the image GET doesnt work
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
