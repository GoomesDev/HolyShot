import Home from './components/home'
import Gallery from './components/gallery'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen 
          name="Gallery" 
          component={Gallery} 
          options={{ 
            title: 'Galeria', 
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            cardStyleInterpolator: ({ current, layouts }) => {
              return {
                cardStyle: {
                 transform: [
                    {
                      translateX: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.width, 0],
                      }),
                    },
                 ],
                },
                overlayStyle: {
                 opacity: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.5],
                 }),
                },
              }
            },
          }}   
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}