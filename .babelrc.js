plugins = [
	[
		require.resolve('metro-react-native-babel-preset'),
		// require.resolve('babel-plugin-module-resolver'),

		{
			root: ['.'],
			alias: {
				api: './App/api',
				assets: './App/assets',
				img: './App/assets/img',
				lottie: './App/assets/lottie',
				components: './App/components',
				navigation: './App/navigation',
				constants: './App/constants',
				context: './App/context',
				reducers: './App/reducers',
				stacks: './App/stacks',
				auth: './App/stacks/auth',
				home: './App/stacks/home',
				events: './App/stacks/home/events',
				eventsComponents: './App/stacks/home/events/components',
				beauty: './App/stacks/home/beauty',
				photo: './App/stacks/home/photo',
				offer: './App/stacks/offer',
				profile: './App/stacks/profile',
				social: './App/stacks/social',
				styles: './App/styles',
				theme: './App/theme',
				utils: './App/utils',
			},
		},
	],
];
