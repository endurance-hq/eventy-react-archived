# frozen_string_literal: true

# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require_relative "config/application"

Rails.application.load_tasks

# This is done to remove css and js builds in test. Need to have better solution.
if Rails.env == "test"
  tasks = Rake.application.instance_variable_get("@tasks")
  tasks.delete("test:prepare") if tasks
end
