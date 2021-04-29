Rails.application.routes.draw do
  namespace :api do 
    namespace :v1 do
      post 'registrations/create';

      get 'sessions/index';
      post 'sessions/create';
      delete 'sessions/destroy/:id', to: 'sessions#destroy';

    end
  end
  root 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
