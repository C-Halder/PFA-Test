import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Splash from './src/screens/Splash';
import Login from './src/screens/stackNav/Login';
import Dashboard from './src/screens/stackNav/Dashboard';
import DetailsPage from './src/screens/stackNav/DetailsPage';


const RootStack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen options={{ headerShown: false }} name='splash' component={Splash} />
        <RootStack.Screen options={{ headerShown: false }} name='login' component={Login} />
        <RootStack.Screen options={{ headerShown: false }} name='dashboard' component={Dashboard} />
        <RootStack.Screen options={{ headerShown: false }} name='detailspage' component={DetailsPage} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;