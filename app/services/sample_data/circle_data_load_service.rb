# frozen_string_literal: true

require "faker"

module SampleData
  class CircleDataLoadService
    def load!
      create_circle_with_users
    end

    private

      def create_circle_with_users
        3.times do
          Current.user = users.sample
          create_circle
        end
      end

      def create_circle
        Circle.create(
          name: Faker::Space.galaxy,
          description: Faker::Space.agency,
          member_ids: user_ids.sample(1 + rand(user_ids.count))
        )
      end

      def users
        @_users ||= User.all
      end

      def user_ids
        @_user_ids ||= users.pluck(:id).shuffle
      end
  end
end
