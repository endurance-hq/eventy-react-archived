# frozen_string_literal: true

desc "Sets up the project by running migration and populating sample data"
task setup: [:environment, "db:drop", "db:create", "db:migrate"] do
  Rake::Task[:setup_sample_data].invoke
end

task setup_sample_data: [:environment] do
  if SampleData::LoaderService.new.load!
    puts "sample data was added successfully"
  else
    print_skip_message
  end
end

def print_skip_message
  puts "Sample data loading is a destructive action and is not allowed in this environment."
end
