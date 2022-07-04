# frozen_string_literal: true

module Api
  module V1
    class AuthenticationController < ApiController
      skip_before_action :authenticate, only: %i[create destroy]

      def create
        user = User.find_by!(email: auth_params[:email])

        raise Errors::AuthenticateError unless user.authenticate(auth_params[:password])

        respond_with_json json: UserSerializer.render_as_json(user, root: :user, view: :with_auth_token),
          status: :created
      end

      def destroy
        Current.user = nil
        respond_with_success message: t("logout_success")
      end

      private

        def auth_params
          params.permit(:email, :password)
        end
    end
  end
end
