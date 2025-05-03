export default {
    plugins: {
        "@tailwindcss/postcss": {},
        "postcss-import": {},
        "postcss-nesting": {},
        autoprefixer: {},
        ...(process.env.NODE_ENV === "production" ? { cssnano: { preset: "default" } } : {}),
    },
};
