[![Linters & Rspec](https://github.com/eventy-core/eventy/actions/workflows/actions.yml/badge.svg)](https://github.com/eventy-core/eventy/actions/workflows/actions.yml)

# EVENTY

A place to host and manage events

- Ruby version `3.1.2`

- Rails `7.0.0`

## Local Development Setup

Clone this repo by running `git clone git@github.com:eventy-core/eventy.git`.

Make sure that [yarn](https://yarnpkg.com) is installed with it as well.

Use the following commands to set up and start the application.

To setup the application.

```bash
./bin/setup
```

To start the application using `foreman`.

```bash
foreman start -f Procfile.dev
```

To start application without `foreman`

```bash
bundle exec rails server
```

Visit http://localhost:3000 and login with email `elon@example.com` and password
`eventy`

## Docker instructions

- Run the below command to build the docker image `ruby docker-compose build `

- Start eventy application in production mode by running the command
  `ruby docker-compose up eventy_prod `

- Start eventy application in development mode by running the command
  `ruby docker-compose up eventy_app `

- Run Rpsec tests by running the command `ruby docker-compose up eventy_test `

- Running the below command starts the eventy application in development and
  also starts the rspec tests `ruby docker-compose up `

- Use the below command to run rails migration, generators, etc
  `ruby docker-compose run --rm <service-name> <rails command> ` Example:
  `ruby docker-compose run --rm eventy_app rake db:create `

Note:

- Uncomment the 'env_file: .env' in docker-compose.yml when using .env file for
  loading the environment variables

## Test instructions

Run test using below command and see the percent coverage

```bash
COVERAGE=true bundle exec rails spec
```

After running your tests, open `coverage/index.html` in the browser of your
choice. For example, in a Mac Terminal, run the following command from your
application's root directory:

```bash
open coverage/index.html
```

### Development Board

Development Board can be found
[here](https://github.com/eventy-core/eventy/projects/1).

### Design

Design can be found
[here](https://xd.adobe.com/view/1ee6ac98-7a2c-45c2-ad57-ae01bf660ae9-4bb5/).
