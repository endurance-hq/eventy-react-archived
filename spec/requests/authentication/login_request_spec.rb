# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Authentication", type: :request do
  describe "POST /login" do
    let(:user) { create(:user, email: "user1@example.com", password: "password") }
    let(:headers) { valid_headers(user).except("Authorization") }
    let(:valid_credentials) do
      { email: user.email, password: "password" }
    end

    it "authenticates the user" do
      post "/api/v1/login", params: valid_credentials
      expect(response).to have_http_status(:created)
      expect(auth_response_without_token).to eq({ "id" => user.id, "user_name" => user.user_name })
    end

    it "returns error when user with email does not exist" do
      post "/api/v1/login", params: { email: "admin@example.com", password: "password" }
      expect(response).to have_http_status(:not_found)
      expect(json).to eq({ "error" => t("error.record_not_found", model_name: "User") })
    end

    it "returns error when password is incorrect" do
      post "/api/v1/login", params: { email: user.email, password: "password1" }
      expect(response).to have_http_status(:unauthorized)
      expect(json).to eq({ "error" => t("error.incorrect_username_or_password") })
    end

    context "when request is valid" do
      before { post "/api/v1/login", params: valid_credentials.to_json, headers: }

      it "returns an authentication token" do
        expect(auth_response_without_token).not_to be_nil
      end
    end
  end
end
