# frozen_string_literal: true

require "rails_helper"
include EventSpecHelper

RSpec.describe "Events Create", type: :request do
  describe "post /create" do
    let(:user) { create(:user, user_name: "elon") }
    let(:co_host) { create(:user, user_name: "musk") }

    context "when request is valid" do
      let(:valid_params) { { event: attributes_for(:event, title: "new_event", host_id: user.id) } }
      let(:user_event_details) { makes_user_event_id_hash(2) << { user_id: co_host.id, event_role: "co_host" } }

      let(:valid_params_with_users) do
        {
          event: attributes_for(
            :event,
            host_id: user.id,
            user_events_attributes: user_event_details
                               )
        }
      end
      context "with event params only" do
        before do
          post "/api/v1/events", params: valid_params.to_json, headers: valid_headers
        end

        it "should create an event" do
          expect(json["notice"]).to eq(t("succesfully_created", entity: "Event"))
        end

        it "should return status code" do
          expect(response).to have_http_status(:created)
        end
      end

      context "with nested user event params" do
        before do
          post "/api/v1/events", params: valid_params_with_users.to_json, headers: valid_headers
        end

        it "should return status code" do
          expect(response).to have_http_status(:created)
        end
      end
    end
  end
end
