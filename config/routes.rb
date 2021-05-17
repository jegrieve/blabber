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
      delete 'servers/destroy/:id', to: 'servers#destroy';

      get 'channels/show/:id', to: 'channels#show';
      post 'channels/create', to: 'channels#create';

      get "messages/index", to: "messages#index"
      post 'messages/create/:id', to: 'messages#create';
    end
  end
  root 'homepage#index'
  # get '/*path' => 'homepage#index'
  #When using /*path the image GET doesnt work
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
