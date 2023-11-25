This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## How to access the apk
   path: "android/app/release/app-release.apk"
   
## App screens

   1> splash screen
   2> login screen with username and password.
   3> dashboard which displays a list of products obtained from the api.
      [API: DummyJSON - Fake REST API of JSON data for development]

## App Functionality

   1> This app has a basic authentication mechanism where the app accepts
      username and password in the log in screen with proper toast notification & messages.
   2> In dashboard a product list will be shown where  user taps on a product, navigate to a new screen that displays the full details of
      that product.
   3> Add to cart button When the user clicks to  add the item to the cart.
   4> Added a "Refresh" button on the dashboard screen that fetches and updates the list of products
      from the API.
   5> Added pull-to-refresh functionality on the dashboard screen.
   6> Implemented proper error handling with toast notification & error messages for API requests and display an error message if the data
      cannot be fetched.


## App Credentials

   username : "user123"
   password: "1234567"