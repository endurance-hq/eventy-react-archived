# frozen_string_literal: true

module Api
  module V1
    class AuthenticationController < ApiController
      skip_before_action :authenticate, only: :create

      def create
        user = User.find_by_user_name!(params.require(:user_name))

        raise Errors::AuthenticateError unless user.authenticate(params.require(:password))

        respond_with_json json: UserSerializer.render_as_json(user, root: :user, view: :with_auth_token),
          status: :created
      end
    end
  end
end
