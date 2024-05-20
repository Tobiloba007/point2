import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash1 from './screens/auth/Splash1';
import Splash2 from './screens/auth/Splash2';
import Login from './screens/auth/Login';
import Register from './screens/auth/Register';
import VerifyAccount from './screens/auth/VerifyAccount';
import RegistrationDone from './screens/auth/RegistrationDone';
import ForgotPassword from './screens/auth/ForgotPassword';
import VerifyOtp from './screens/auth/VerifyOtp';
import CreateNewPassword from './screens/auth/CreateNewPassword';
import ResetSuccess from './screens/auth/ResetSuccess';
import Tab from './screens/Tab';
import ViewDetailsPage from './screens/ViewDetailsPage';
import Tracking from './screens/Tracking';
import ChatBox from './screens/ChatBox';
import PickUpDetails from './screens/PickUpDetails';
import DeliveryLocation from './screens/DeliveryLocation';
import SendPackageSuccess from './screens/SendPackageSuccess';

const Stack = createStackNavigator();

const AppStack = () => {

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="tab"
        screenOptions={{
          headerShown: false // Hide the header for all screens within Stack.Navigator
        }}>
            <Stack.Screen name="splash1" component={Splash1} />
            <Stack.Screen name="splash2" component={Splash2} />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="register" component={Register} />
            <Stack.Screen name="verifyAccount" component={VerifyAccount} />
            <Stack.Screen name="registrationDone" component={RegistrationDone} />
            <Stack.Screen name="forgotPassword" component={ForgotPassword} />
            <Stack.Screen name="verifyOtp" component={VerifyOtp} />
            <Stack.Screen name="createNewPassword" component={CreateNewPassword} />
            <Stack.Screen name="resetSuccess" component={ResetSuccess} options={{headerShown: false}} />
            <Stack.Screen name="tab" component={Tab} />
            <Stack.Screen name="viewDetailsPage" component={ViewDetailsPage} />
            {/*<Stack.Screen name="rateRider" component={RateRider} />*/}
            <Stack.Screen name="tracking" component={Tracking} />
            <Stack.Screen name="chatBox" component={ChatBox} />
            <Stack.Screen name="pickUpDetails" component={PickUpDetails} />
            <Stack.Screen name="deliveryLocation" component={DeliveryLocation} />
            <Stack.Screen name="sendPackageSuccess" component={SendPackageSuccess} />



        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;