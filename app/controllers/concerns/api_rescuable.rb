# frozen_string_literal: true

module ApiRescuable
  extend ActiveSupport::Concern

  included do
    rescue_from Exception, with: :handle_exception
    rescue_from ActiveRecord::RecordNotFound, with: :handle_record_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :handle_validation_error
    rescue_from ActiveRecord::RecordNotUnique, with: :handle_record_not_unique
    rescue_from ActionController::ParameterMissing, with: :handle_api_error
    rescue_from Errors::AuthenticateError, with: :handle_unauthenticated
    rescue_from Errors::Unauthorized, with: :handle_unauthorized
    rescue_from Errors::Jwt::MissingToken, with: :handle_missing_token
    rescue_from Errors::Jwt::InvalidToken, with: :handle_invalid_token
    rescue_from JWT::ExpiredSignature, with: :handle_expired_signature
  end

  private

    def handle_validation_error(exception)
      log_error(exception)
      respond_with_error(exception)
    end

    def handle_record_not_found(exception)
      log_error(exception)
      respond_with_error(exception.message, :not_found)
    end

    def handle_record_not_unique(exception)
      log_error(exception)
      respond_with_error(exception)
    end

    def handle_api_error(exception)
      log_error(exception)
      respond_with_error(exception, :internal_server_error)
    end

    def handle_unauthenticated(exception)
      log_error(exception)
      respond_with_error(t("incorrect_username_or_password"), :unauthorized)
    end

    def handle_unauthorized(exception)
      log_error(exception)
      respond_with_error(t("please_login_to_continue"), :unauthorized)
    end

    def handle_missing_token(exception)
      log_error(exception)
      respond_with_error(t("missing_token"), :unprocessable_entity)
    end

    def handle_invalid_token(exception)
      log_error(exception)
      respond_with_error(t("invalid_token"), :unprocessable_entity)
    end

    def handle_expired_signature(exception)
      log_error(exception)
      Current.user = nil
      respond_with_error(:expired_signature, :unprocessable_entity)
    end

    def handle_exception(exception)
      log_error(exception)
      respond_with_error(:something_went_wrong)
    end

    def log_error(error)
      Rails.logger.info error.class.to_s
      Rails.logger.info error.to_s
      Rails.logger.info error.backtrace.join("\n")
    end
end
