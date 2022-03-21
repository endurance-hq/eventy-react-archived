# frozen_string_literal: true

module RequestSpecHelper
  def json
    JSON.parse(response.body)
  end

  def auth_response_without_token
    auth_response.except("auth_token")
  end

  def auth_response
    return json.dig("notice", "user") if notice?
    return json["error"] if error?

    json["user"] || {}
  end

  def notice?
    json["notice"].present?
  end

  def error?
    json["error"].present?
  end

  def token_generator(user)
    Jwt::Issuer.call(user)
  end

  def valid_headers(user = FactoryBot.create(:user))
    {
      "Authorization" => "Bearer #{token_generator(user)}",
      "Content-Type" => "application/json"
    }
  end
end
