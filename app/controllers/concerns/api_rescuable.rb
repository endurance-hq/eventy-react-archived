# frozen_string_literal: true

module ApiRescuable
  extend ActiveSupport::Concern

  included do
    rescue_from ActiveRecord::RecordNotFound, with: :handle_record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :handle_validation_error
    rescue_from ActiveRecord::RecordNotUnique, with: :handle_record_not_unique
    rescue_from ActionController::ParameterMissing, with: :handle_api_error
    rescue_from Errors::AuthenticateError, with: :handle_unauthenticated
    rescue_from Errors::Unauthorized, with: :handle_unauthorized
    rescue_from Errors::Jwt::MissingToken, with: :handle_missing_token
    rescue_from Errors::Jwt::InvalidToken, with: :handle_invalid_token
  end

  private

    def handle_validation_error(exception)
      respond_with_error(exception)
    end

    def handle_record_not_found(exception)
      respond_with_error(exception.message, :not_found)
    end

    def handle_record_not_unique(exception)
      respond_with_error(exception)
    end

    def handle_api_error(exception)
      respond_with_error(exception, :internal_server_error)
    end

    def handle_unauthenticated
      respond_with_error(t("incorrect_username_or_password"), :unauthorized)
    end

    def handle_unauthorized
      respond_with_error(t("please_login_to_continue"), :unauthorized)
    end

    def handle_missing_token
      respond_with_error(t("missing_token"), :unprocessable_entity)
    end

    def handle_invalid_token
      respond_with_error(t("invalid_token"), :unprocessable_entity)
    end

    def handle_expired_signature
      Current.user = nil
      respond_with_error(:expired_signature, :unprocessable_entity)
    end
end
