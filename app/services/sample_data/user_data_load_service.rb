# frozen_string_literal: true

require "faker"

module SampleData
  class UserDataLoadService
    PASSWORD = "eventy"

    def load!
      create_admin_user
      create_users
    end

    private

      def create_admin_user
        User.create(
          user_name: "elon",
          email: "elon@example.com",
          first_name: "Elon",
          last_name: "musk",
          password: PASSWORD
        )
      end

      def create_users
        10.times do
          create_user
        end
      end

      def create_user
        User.create(
          user_name: Faker::Internet.username,
          email: Faker::Internet.email(domain: "example"),
          first_name: Faker::Name.first_name,
          last_name: Faker::Name.last_name,
          password: PASSWORD
        )
      end
  end
end
