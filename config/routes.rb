# frozen_string_literal: true

Rails.application.routes.draw do
  root "home#index"

  draw :api

  get "*path", to: "home#index", constraints: -> (request) do
    request.path.exclude?("/rails") && !request.xhr? && request.format.html?
  end
end
