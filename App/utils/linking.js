const config = {
  // Profile: {
  //   path: 'profile/:id',
  //   // path: 'user/:id/:section?', // optional params section?
  //   parse: {
  //     id: (id) => `${id}`,
  //   },
  // },
  screens: {
    // all screens in my Drowers
    HomeStack: {
      initialRouteName: 'Tabs',
      screens: {
        Tabs: {
          initialRouteName: 'Category',
          screens: {
            Category: 'Category',
            Social: 'Social',
            Booking: 'Booking',
          },
        },
        Phone: 'Phone',
        Beauty: 'Beauty',
        BeautyList: 'BeautyList',
        EventList: 'EventList',
        EventMap: 'EventMap',
        EventDetail: 'EventDetail',
        PlannerDetail: 'PlannerDetail',
      },
    },
    // all screens in my Drowers folow
    // Notifications: 'notifications',
    // Settings: 'settings',
    // NotFound: '*',
  },
};
const linking = {
  prefixex: ['http://kantaui.page.link', 'https://kantaui.page.link'],
  config,
};

export default linking;

// npx uri-scheme open mychat://chat/jane --android
