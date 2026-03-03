import { createStackNavigator } from "@react-navigation/stack";
import {
  DefaultTheme,
  NavigationContainer,
  NavigationProp,
} from "@react-navigation/native";

import { Theme } from "./shared/themes/Theme";
import { Settings } from "./pages/Settings";
import { Home } from "./pages/Home";

type TScreenDefinitions = {
  Home: undefined;
  Settings: undefined;
};

const Stack = createStackNavigator();

export function AppRoutes() {
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        fonts: {
          ...DefaultTheme.fonts,
          bold: {
            fontWeight: "700",
            fontFamily: Theme.fonts.interBold,
          },
          regular: {
            fontWeight: "500",
            fontFamily: Theme.fonts.interRegular,
          },
        },
        colors: {
          ...DefaultTheme.colors,
          background: Theme.colors.background,
          text: Theme.colors.text,
          primary: Theme.colors.primary,
          card: Theme.colors.divider,
        },
      }}
    >
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export type TNavigationScreenProps = NavigationProp<TScreenDefinitions>;
