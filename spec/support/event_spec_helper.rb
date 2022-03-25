# frozen_string_literal: true

module EventSpecHelper
  def makes_user_event_id_hash(count, role = "participant")
    user_event = []
    count.times { |num|
      user_event << { user_id: create(:user).id, event_role: role }
    }
    user_event
  end

  def fetch_by_event_role(response_hash, role)
    response = response_hash["notice"] ? response_hash.dig(
      "notice", "event",
      "user_events") : response_hash.dig("event", "user_events")
    response.select { |user_event|
      user_event["event_role"] == role }
  end
end
