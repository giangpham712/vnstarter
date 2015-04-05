Rails.application.routes.draw do

  get 'pledges/create'
  get 'messages/create'

  devise_for :users do

  end

  resources :users, except: :show do

  end

  get 'profile/projects', to: 'projects#my'
  get 'profile/messages', to: 'messages#my'

  post 'profile/avatar', to: 'users#upload_image'

  get 'profile', to: 'users#show'
  get 'profile/edit', to: 'users#edit'
  get 'profile/:id', to: 'users#show'
  put 'profile', to: 'users#update_profile'

  resources :messages do

  end

  get 'discover', to: 'discover#index'
  get 'discover/categories/:id', to: 'discover#category_projects', as: 'discover_category'

  resources :projects do

    collection do
      get 'create'
      get 'search'
    end

    resources :posts do

    end

    resources :rewards do

    end

    resources :pledges do

    end

    resources :comments do

    end

    member do
      get :manage, to: 'projects#manage', as: 'manage'
      post :launch_project
      post :stop_project
      post :upload_image
    end
  end

  get 'home/index'
  get 'home/about'
  # You can have the root of your site routed with "root"
  root 'home#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
