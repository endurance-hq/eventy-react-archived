# frozen_string_literal: true

module Api
  module V1
    class EventsController < ApiController
      before_action :load_event!, only: %i[edit show update]

      def index
        render_all_events(params)
      end

      def create
        event = Event.new(event_params)
        event.save!
        respond_with_success message: t("successfully_created", entity: "Event"), status: :created
      end

      def edit
        respond_with_json json: EventSerializer.render_as_json(@event, root: :event, view: :with_all_associations)
      end

      def show
        respond_with_json json: EventSerializer.render_as_json(@event, root: :event, view: :with_all_associations)
      end

      def update
        @event.update!(event_params)
        respond_with_success message: t("successfully_updated", entity: "Event")
      end

      def toggle_pin
        user_event = UserEvent.find(params[:id])
        user_event.toggle_priority
        parameters = { id: user_event.id }
        render_all_events(parameters)
      end

      private

        def event_params
          params.require(:event).permit(
            :title, :description, :start_time, :end_time, :host_id,
            user_events_attributes: [:id, :_destroy, :user_id, :event_role])
        end

        def load_event!
          @event = Event.includes(user_events: :user).find(params[:id])
        end

        def render_all_events(parameters)
          events = EventQuery.call(parameters)
          respond_with_json json: EventSerializer.render_as_json(events, root: :event, view: :with_all_associations),
            status: :ok
        end
    end
  end
end
