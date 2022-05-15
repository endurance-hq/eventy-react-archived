module.exports = {
  content: [
    "./app/views/**/*.html.erb",
    "./app/helpers/**/*.rb",
    "./app/assets/stylesheets/**/*.scss",
    "./app/javascript/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "login-wave": "url('login-wave.svg')",
      },
      minHeight: {
        120: "30rem",
      },
    },
  },
};
