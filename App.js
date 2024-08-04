import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import CabsListScreen from "./screens/CabsListScreen";
import CabDetailScreen from "./screens/CabDetailScreen";
import MyCabsScreen from "./screens/MyCabsScreen";
import { BookingProvider } from "./context/BookingContext";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const theme = {
  colors: {
    primary: "#4a90e2",
    background: "#f0f4f8",
    card: "#ffffff",
    text: "#333333",
    border: "#d1d1d1",
    notification: "#ff3b30",
  },
};

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: "#ffffff",
      }}
    >
      <Stack.Screen name="CabsList" component={CabsListScreen} options={{ title: "Available Cabs" }} />
      <Stack.Screen name="CabDetail" component={CabDetailScreen} options={{ title: "Cab Details" }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <BookingProvider>
      <NavigationContainer theme={theme}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === "Home") {
                iconName = "home-outline";
              } else if (route.name === "My Cab") {
                iconName = "car-outline";
              }
              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: theme.colors.primary,
            inactiveTintColor: theme.colors.text,
            style: { backgroundColor: theme.colors.card },
          }}
        >
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="My Cab" component={MyCabsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </BookingProvider>
  );
}