export default {
  plugins: [
    // @ts-expect-error: postcss-import types
    (await import('postcss-import')).default,
    // @ts-expect-error: autoprefixer types
    (await import('autoprefixer')).default,
    // @ts-expect-error: cssnano types
    (await import('cssnano')).default,
  ],
};
