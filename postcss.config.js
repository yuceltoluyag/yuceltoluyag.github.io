module.exports = {
    plugins: {
        "postcss-import": {},
        "tailwindcss/nesting": {},
        tailwindcss: {},
        "postcss-preset-env": {
            features: { "nesting-rules": false },
        },
        autoprefixer: {
            grid: true,
            flexbox: true,
        },
        ...(process.env.NODE_ENV === "production"
            ? {
                  cssnano: {
                      preset: [
                          "default",
                          {
                              discardComments: { removeAll: true },
                              normalizeWhitespace: true,
                              minifyFontValues: true,
                              colormin: true,
                          },
                      ],
                  },
              }
            : {}),
    },
};
