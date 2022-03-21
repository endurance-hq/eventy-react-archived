# frozen_string_literal: true

module Api
  module V1
    class CirclesController < ApiController
      before_action :set_circle, only: %i[show update destroy]

      # GET /circles
      def index
        circles = Circle.for_user

        respond_with_json json: CircleSerializer.render_as_json(circles, root: :circles, view: :with_head_and_members)
      end

      # GET /circles/1
      def show
        respond_with_json json: CircleSerializer.render_as_json(@circle, root: :circle, view: :with_head_and_members)
      end

      # POST /circles
      def create
        circle = Circle.new(circle_params)

        circle.save!
        respond_with_success message:
          CircleSerializer.render_as_json(circle, root: :circle, view: :with_head_and_members),
          status: :created
      end

      # PATCH/PUT /circles/1
      def update
        @circle.update!(circle_params)
        respond_with_success message: CircleSerializer.render_as_json(
          @circle, root: :circle,
          view: :with_head_and_members)
      end

      # DELETE /circles/1
      def destroy
        @circle.destroy!
        respond_with_success message: t("succesfully_deleted", entity: "Circle")
      end

      private

        # Use callbacks to share common setup or constraints between actions.
        def set_circle
          @circle = Circle.find(params[:id])
        end

        # Only allow a list of trusted parameters through.
        def circle_params
          params.require(:circle).permit(:name, :description, :member_ids)
        end
    end
  end
end
