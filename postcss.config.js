module.exports = ({ env }) => ({
  plugins: [
    require("postcss-import")(),
    require("postcss-custom-media")(),
    require("postcss-color-mod-function")(),
    require("postcss-mixins")(),
    require("postcss-nested")(),
    require("postcss-preset-env")({
      stage: 1,
      autoprefixer: { grid: true },
      browsers: "defaults",
    }),
    env === "production" ? require("cssnano")({ preset: "default" }) : false, // Minifies CSS in production
  ].filter(Boolean),
});
