// @ts-nocheck

export default {
  locales: ['fr', 'en'],
  output: 'src/i18n/locales/$LOCALE.json',
  defaultValue: (locale, namespace, key) => {
    if (locale === 'fr') return key;
    return '';
  },
  keySeparator: '.',
  namespaceSeparator: ':',
  createOldCatalogs: false,
  lexers: {
    js: ['JsxLexer'],
    jsx: ['JsxLexer']
  }
};
