# frozen_string_literal: true

require "rails_helper"

RSpec.describe Event, type: :model do
  it { should belong_to(:host).class_name("User").with_foreign_key("host_id") }
  it { should have_many(:user_events).dependent(:delete_all) }
  it { should have_many(:recipients).through(:user_events).source(:user) }
  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:description) }
  it { should validate_presence_of(:host_id) }
  it { should validate_presence_of(:start_time) }

  context "event time validations" do
    let(:event) { create(:event) }
    it "validate that start time before end_time" do
      event.end_time = Time.zone.today
      expect(event).to_not be_valid
    end
  end

  context "arel queries" do
    it "test active scope builds query as expected" do
      active_sql = Event.active.to_sql
      expect(active_sql).to include(%{"events"."start_time" >= '})
    end

    it "test order by priority works as expected" do
      order_by_user_priority_sql = Event.order_by_user_priority(1).to_sql
      expect(order_by_user_priority_sql).to include(
        %{ORDER BY "user_events"."priority" ASC NULLS FIRST, "events"."start_time" ASC}
      )
    end
  end
end
