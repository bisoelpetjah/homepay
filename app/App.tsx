import React, { FC } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Splash from './pages/splash/Splash'
import Welcome from './pages/welcome/Welcome'
import Start from './pages/start/Start'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'

import { RootStackParamList } from './navigation'

import { surfacesLightSurface3 } from './styles/colors'

const Stack = createNativeStackNavigator<RootStackParamList>()

const App: FC = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ header: () => null }}>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ contentStyle: { backgroundColor: surfacesLightSurface3 } }} />
      <Stack.Screen
        name="Welcome"
        component={Welcome} />
      <Stack.Screen
        name="Start"
        component={Start}
        options={{ contentStyle: { backgroundColor: surfacesLightSurface3 } }} />
      <Stack.Screen
        name="Login"
        component={Login} />
      <Stack.Screen
        name="Signup"
        component={Signup} />
    </Stack.Navigator>
  </NavigationContainer>
)

export default App
