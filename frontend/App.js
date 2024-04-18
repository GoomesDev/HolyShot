import Home from './components/home'
import Gallery from './components/gallery'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as Font from 'expo-font'
import React, { useState , useEffect } from 'react'
import AppLoading from 'expo-app-loading'

const Stack = createStackNavigator()

const loadFonts = async () => {
  await Font.loadAsync({
    'bebas': require('./assets/BebasNeue-Regular.otf'),
    'panorama': require('./assets/The Panorama.otf'),
  })
}

export default function App() {

  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    const loadApp = async () => {
      await loadFonts()
      setFontsLoaded(true)
    }

    loadApp()
  }, [])

  if (!fontsLoaded) {
    return <AppLoading />
  }

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
              fontFamily: 'bebas',
              fontSize: 26
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