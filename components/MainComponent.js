import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import GreetingsComponent from "./GreetingsComponent";
import LoginComponent from "./LoginComponent";
import HomeComponent from "./HomeComponent";
import CourseListComponent from "./CourseListComponent";

var Stack = createStackNavigator();

function LoginNavigatorScreen()
{
    return (
        <Stack.Navigator initialRouteName="Greetings"
        screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="Greetings" component={GreetingsComponent} />
            <Stack.Screen name="Login" component={LoginComponent} />
            <Stack.Screen name="Bridge" component={BridgeComponent} />
        </Stack.Navigator>
    )
}

function BridgeComponent(props)
{
    //console.log("From bridge: ", props);
    return (
        <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="Main">
                {(prop) => <MainNavigatorScreen {...prop} account = {props.route.params.account} />}
            </Stack.Screen>
        </Stack.Navigator>
    )
}

function MainNavigatorScreen(props)
{
    //console.log("From MainNav: ", props);
    return (
        <Stack.Navigator initialRouteName="Home"
        screenOptions = {{
            headerShown: false,
        }}>
            <Stack.Screen name="Home">
                { (prop) => <HomeComponent {...prop} account = {props.account}/>}
            </Stack.Screen>
            <Stack.Screen name="CourseList" component={CourseListComponent} />
        </Stack.Navigator>
    )
}

export default function MainComponent(props)
{
    return (
        <NavigationContainer>
            <LoginNavigatorScreen/>
        </NavigationContainer>
    )
}