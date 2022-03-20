# frozen_string_literal: true

namespace :api, defaults: { format: :json } do
  namespace :v1 do
    post "login", to: "authentication#create"
    post "register", to: "users#create"

    resources :events do
      member do
        get :edit
        get :toggle_pin
      end
    end

    resources :circles
  end
end
