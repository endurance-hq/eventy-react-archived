# frozen_string_literal: true

module ApiRescuable
  extend ActiveSupport::Concern

  included do
    rescue_from Exception, with: :handle_exception
    rescue_from ActiveRecord::RecordNotFound, with: :handle_record_not_found
    rescue_from ActiveRecord::RecordInvalid, ActiveRecord::RecordNotUnique, with: :handle_record_error
    rescue_from ActionController::ParameterMissing, with: :handle_api_error
    rescue_from Errors::AuthenticateError, with: :handle_unauthenticated
    rescue_from Errors::Unauthorized, with: :handle_unauthorized
    rescue_from Errors::Jwt::MissingToken, with: :handle_missing_token
    rescue_from Errors::Jwt::InvalidToken, with: :handle_invalid_token
    rescue_from JWT::ExpiredSignature, with: :handle_expired_signature
  end

  private

    def handle_record_error
      log_error(exception)
      respond_with_error status: :unprocessable_entity, message: exception.record.error_sentence
    end

    def handle_record_not_found(exception)
      log_error(exception)
      respond_with_error status: :not_found, message: exception.message
    end

    def handle_api_error(exception)
      log_error(exception)
      respond_with_error status: :unprocessable_entity, message: exception.message
    end

    def handle_unauthenticated(exception)
      log_error(exception)
      respond_with_error status: :unauthorized, message: t("error.incorrect_username_or_password")
    end

    def handle_unauthorized(exception)
      log_error(exception)
      respond_with_error status: :unauthorized, message: t("error.please_login_to_continue")
    end

    def handle_missing_token(exception)
      log_error(exception)
      respond_with_error status: :unprocessable_entity, message: t("error.missing_token")
    end

    def handle_invalid_token(exception)
      log_error(exception)
      respond_with_error status: :unprocessable_entity, message: t("error.invalid_token")
    end

    def handle_expired_signature(exception)
      log_error(exception)
      Current.user = nil
      respond_with_error status: :unprocessable_entity, message: :expired_signature
    end

    def handle_exception(exception)
      log_error(exception)
      respond_with_error message: t("error.something_went_wrong")
    end

    def log_error(error)
      Rails.logger.info error.class.to_s
      Rails.logger.info error.to_s
      Rails.logger.info error.backtrace.join("\n")
    end
end
