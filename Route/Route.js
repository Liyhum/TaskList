import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from '../screens/HomeScreen';
const Stack = createStackNavigator();
import { NavigationContainer } from "@react-navigation/native";
import React,{Component} from 'react';

function Home() {
    return(
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Transaksi" component={HomeScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
    )
}
export default Home