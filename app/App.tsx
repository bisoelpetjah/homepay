import React, { FC } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Splash from './pages/splash/Splash'
import Welcome from './pages/welcome/Welcome'
import Start from './pages/start/Start'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import DashboardHomeowner from './pages/dashboard-homeowner/DashboardHomeowner'
import HomeownerProjectDetail from './pages/homeowner-project-detail/HomeownerProjectDetail'
import DashboardInteriorDesignFirm from './pages/dashboard-interior-design-firm/DashboardInteriorDesignFirm'
import SettingsInformation from './pages/settings/information/Information'
import SettingsNotifications from './pages/settings/notifications/Notifications'
import SettingsTransactionHistory from './pages/settings/transaction-history/TransactionHistory'
import SettingsFAQ from './pages/settings/faq/FAQ'
import SettingsTnC from './pages/settings/tnc/TnC'

import { RootStackParamList } from './navigation'

import { surfacesLightSurface3 } from './styles/colors'

const Stack = createNativeStackNavigator<RootStackParamList>()

const App: FC = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#f6f6f6' } }}>
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
      <Stack.Screen
        name="DashboardHomeowner"
        component={DashboardHomeowner} />
      <Stack.Screen
        name="HomeownerProjectDetail"
        component={HomeownerProjectDetail} />
      <Stack.Screen
        name="DashboardInteriorDesignFirm"
        component={DashboardInteriorDesignFirm} />
      <Stack.Screen
        name="SettingsInformation"
        component={SettingsInformation} />
      <Stack.Screen
        name="SettingsNotifications"
        component={SettingsNotifications} />
      <Stack.Screen
        name="SettingsTransactionHistory"
        component={SettingsTransactionHistory} />
      <Stack.Screen
        name="SettingsFAQ"
        component={SettingsFAQ} />
      <Stack.Screen
        name="SettingsTnC"
        component={SettingsTnC} />
    </Stack.Navigator>
  </NavigationContainer>
)

export default App
