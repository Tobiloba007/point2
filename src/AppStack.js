import Splash1 from './screens/auth/Splash1';
import { createStackNavigator } from '@react-navigation/stack';
import Splash2 from './screens/auth/Splash2';
import Login from './screens/auth/Login';
import Register from './screens/auth/Register';
import VerifyAccount from './screens/auth/VerifyAccount';
import RegistrationDone from './screens/auth/RegistrationDone';
import Tab from './screens/Tab';
import ForgotPassword from './screens/auth/ForgotPassword';
import VerifyOtp from './screens/auth/VerifyOtp';
import CreateNewPassword from './screens/auth/CreateNewPassword';
import ResetSuccess from './screens/auth/ResetSuccess';
import ViewDetailsPage from './screens/ViewDetailsPage';
import RateRider from './screens/RateRider';
import Tracking from './screens/Tracking';
import ChatBox from './screens/ChatBox';
import PickUpDetails from './screens/PickUpDetails';
import DeliveryLocation from './screens/DeliveryLocation';
import SendPackageSuccess from './screens/SendPackageSuccess';
import Map from './screens/Map';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createStackNavigator();

const AppStack = () => {

  return (
    <NavigationContainer></NavigationContainer>
    <Stack.Navigator initialRouteName="splash1">
      <Stack.Screen name="splash1" component={Splash1} options={{headerShown: false}} />
      <Stack.Screen name="splash2" component={Splash2} options={{headerShown: false}} />
      <Stack.Screen name="login" component={Login} options={{headerShown: false}} />
      <Stack.Screen name="register" component={Register} options={{headerShown: false}} />
      <Stack.Screen name="verifyAccount" component={VerifyAccount} options={{headerShown: false}} />
      <Stack.Screen name="registrationDone" component={RegistrationDone} options={{headerShown: false}} />
      <Stack.Screen name="forgotPassword" component={ForgotPassword} options={{headerShown: false}} />
      <Stack.Screen name="verifyOtp" component={VerifyOtp} options={{headerShown: false}} />
      <Stack.Screen name="createNewPassword" component={CreateNewPassword} options={{headerShown: false}} />
      <Stack.Screen name="resetSuccess" component={ResetSuccess} options={{headerShown: false}} />
      <Stack.Screen name="tab" component={Tab} options={{headerShown: false}} />
      <Stack.Screen name="viewDetailsPage" component={ViewDetailsPage} options={{headerShown: false}} />
      {/*<Stack.Screen name="rateRider" component={RateRider} options={{headerShown: false}} />*/}
      <Stack.Screen name="tracking" component={Tracking} options={{headerShown: false}} />
      <Stack.Screen name="chatBox" component={ChatBox} options={{headerShown: false}} />
      <Stack.Screen name="pickUpDetails" component={PickUpDetails} options={{headerShown: false}} />
      <Stack.Screen name="deliveryLocation" component={DeliveryLocation} options={{headerShown: false}} />
      <Stack.Screen name="sendPackageSuccess" component={SendPackageSuccess} options={{headerShown: false}} />
      <Stack.Screen name="map" component={Map} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

export default AppStack;