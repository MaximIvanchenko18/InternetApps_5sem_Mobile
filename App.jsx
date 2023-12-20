import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CargosListScreen from './screens/CargosListScreen';
import CargoInfoScreen from './screens/CargoInfoScreen';
import { store } from './store';
import { Provider } from 'react-redux';

global.Buffer = require('buffer').Buffer;

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    contentStyle: {
                        backgroundColor: '#FFFFFF'
                    }
                }}>
                    <Stack.Screen
                        name='CargosList'
                        component={CargosListScreen}
                        options={{
                            title: 'Список грузов',
                            headerStyle: {
                                backgroundColor: '#212529',
                            },
                            headerTintColor: '#c7c8c9',
                        }}
                    />
                    <Stack.Screen
                        name='CargoInfo'
                        component={CargoInfoScreen}
                        options={({ route }) => ({
                            title: route.params.marking || 'Информация о грузе',
                            headerStyle: {
                                backgroundColor: '#212529',
                            },
                            headerTintColor: '#c7c8c9',
                        })}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}