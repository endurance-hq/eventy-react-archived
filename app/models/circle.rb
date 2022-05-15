# frozen_string_literal: true

class Circle < ApplicationRecord
  belongs_to :head, class_name: "User", foreign_key: "head_id"

  before_validation :assign_circle_head, on: :create

  validates :name, presence: true
  validates :description, presence: true
  validates :head_id, presence: true

  scope :for_user, -> (user_id = Current.user&.id) { where(head_id: user_id).or(for_member(user_id)) }

  def self.for_member(member_id)
    where(
      Arel::Nodes::Equality.new(
        Arel::Nodes.build_quoted(member_id.to_s),
        Arel::Nodes::NamedFunction.new("ANY", [arel_table[:member_ids]])
      )
    )
  end

  def members
    @_members ||= User.where(id: member_ids)
  end

  private

    def assign_circle_head
      self.head = Current.user
    end
end
