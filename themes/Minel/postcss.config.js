module.exports = {
  plugins: {
    "postcss-import": {},
    tailwindcss: {},
    "postcss-nesting": {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === "production"
      ? {
          cssnano: {
            preset: ["default", { discardComments: { removeAll: true } }],
          },
        }
      : {}),
  },
};
