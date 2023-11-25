/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import Store from './src/services/store/Store';


const providerApp = () => {
    return (
        <Provider store={Store} >
            <App />

            <Toast position="top" autoHide={true} visibilityTime={3000} />
        </Provider>
    );
};

AppRegistry.registerComponent(appName, () => providerApp);
