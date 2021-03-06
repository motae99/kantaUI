package com.kantaui;

import com.facebook.react.ReactActivity;

// React-native-gusture-handler
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
// React-native-gusture-handler


// react-native-splash-screen >= 0.3.1
import org.devio.rn.splashscreen.SplashScreen; 
import android.os.Bundle; // here
// react-native-splash-screen >= 0.3.1

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "KantaUI";
  }

// React-native-gusture-handler
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
      protected ReactRootView createRootView() {
      return new RNGestureHandlerEnabledRootView(MainActivity.this);
      }
    };
  }
// React-native-gusture-handler


//SplashScreen
@Override
protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this);  // here
    super.onCreate(savedInstanceState);
}
//SplashScreen

}
