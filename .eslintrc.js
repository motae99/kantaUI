module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['import'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['App'],
        alias: {
          _assets: './App/assets',
          _api: './App/api',
          _components: './App/components',
          _buttons: './App/components/buttons',
          _cards: './App/components/cards',
          _constants: './App/constants',
          _navigation: './App/navigation',
          _stacks: './App/stacks',
          _events: './App/stacks/home/events',
          _eventsComponents: './App/stacks/home/events/components',
          _beauty: './App/stacks/home/beauty',
          _photo: './App/stacks/home/photo',
          _social: './App/stacks/social',
          _reducers: './App/reducers',
          _styles: './App/styles',
          _utils: './App/utils',
        },
      },
    },
  },
};
