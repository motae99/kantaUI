module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./App'],
        extensions: [
          '.ios.ts',
          '.ios.js',
          '.android.ts',
          '.android.js',
          '.ts',
          '.ios.tsx',
          '.ios.js',
          '.android.tsx',
          '.android.js',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          img: './App/assets/img',
          lottie: './App/assets/lottie',
          api: './App/api',
          components: './App/components',
          constants: './App/constants',
          reducers: './App/reducers',
          navigation: './App/navigation',
          stacks: './App/stacks',
          events: './App/stacks/home/events',
          eventsComponents: './App/stacks/home/events/components',
          beauty: './App/stacks/home/beauty',
          photo: './App/stacks/home/photo',
          social: './App/stacks/social',
          styles: './App/styles',
          theme: './App/theme',
          utils: './App/utils',
        },
      },
    ],
  ],
};
