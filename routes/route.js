import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

function Home() {
    return(
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{
                title:"Counting",
            }}
            />
        </Stack.Navigator>
    </NavigationContainer>
    )
}
export default Home