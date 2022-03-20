# frozen_string_literal: true

module Api
  module V1
    class ApiController < ActionController::API
      include ApiResponders
      include ApiRescuable

      before_action :authenticate

      private

        def authenticate
          user = Jwt::Authenticator.call(request.headers)

          set_current_attributes(user)
        end

        def set_current_attributes(user)
          Current.user = user
          # FIXME: check for better approach to handle multi tenancy
          Current.circle = Circle.for_user(user.id).where(id: request.headers["CircleId"]).first
        end
    end
  end
end
