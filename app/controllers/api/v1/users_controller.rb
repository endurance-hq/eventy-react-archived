# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApiController
      skip_before_action :authenticate, only: :create

      def create
        user = User.new(user_params)
        user.save!
        respond_with_json json: UserSerializer.render_as_json(user, root: :user, view: :with_auth_token),
          status: :created
      end

      private

        def user_params
          params.require(:user).permit(:user_name, :email, :first_name, :middle_name, :last_name, :password)
        end
    end
  end
end
