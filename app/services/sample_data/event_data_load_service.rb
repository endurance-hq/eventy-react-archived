# frozen_string_literal: true

require "faker"

module SampleData
  class EventDataLoadService
    def load!
      create_events
      create_user_events
      add_co_host_to_any_event!
    end

    def create_events
      10.times do
        create_event
      end
    end

    def create_user_events
      Event.all.each do |event|
        add_partcipants(event)
      end
    end

    def create_event
      Event.create(
        host_id: user_ids.sample,
        title: Faker::Lorem.word,
        description: Faker::Lorem.sentence,
        place: Faker::Address.street_name,
        start_time: Faker::Date.forward(days: Faker::Number.within(range: 1..10))
      )
    end

    def add_partcipants(event)
      event.user_events.create(user_event_data)
    end

    def add_co_host_to_any_event!
      user_event = UserEvent.participants.sample
      user_event.event_role = "co_host"
      user_event.save!
    end

    def user_ids
      @_user_ids = User.pluck(:id).shuffle
    end

    def user_event_data
      partcipant_ids = user_ids.sample(1 + rand(user_ids.count))
      partcipant_ids.map { |user_id| { user_id: } }
    end
  end
end
