# frozen_string_literal: true

module SampleData
  class LoaderService
    def load!
      return if skip?

      load_data!
    end

    def load_data!
      load_user_data
      load_circle_data
      load_event_data
    end

    private

      def load_user_data
        UserDataLoadService.new.load!
      end

      def load_circle_data
        CircleDataLoadService.new.load!
      end

      def load_event_data
        EventDataLoadService.new.load!
      end

      def skip?
        !Rails.env.development?
      end
  end
end
