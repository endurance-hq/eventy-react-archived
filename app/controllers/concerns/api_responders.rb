# frozen_string_literal: true

module ApiResponders
  extend ActiveSupport::Concern

  private

    def respond_with_error(message:, status: :unprocessable_entity, context: {})
      render status: status, json: { error: message }.merge(context)
    end

    def respond_with_success(message:, status: :ok, context: {})
      render status: status, json: { notice: message }.merge(context)
    end

    def respond_with_json(json: {}, status: :ok)
      render status: status, json: json
    end
end
