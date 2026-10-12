/**
 * This babel.config is only used for publishing.
 *
 * For local dev experience, see the babel.config
 */
module.exports = {
  plugins: [
    [
      '@babel/plugin-transform-typescript',
      {
        allExtensions: true,
        allowDeclareFields: true,
        onlyRemoveTypeImports: true,
      },
    ],
    [
      'babel-plugin-ember-template-compilation',
      {
        targetFormat: 'hbs',
        transforms: [],
      },
    ],
  ],

  generatorOpts: {
    compact: false,
  },
};
