import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { TNavigationScreenProps } from "../appRoutes";
import { Theme } from "../shared/themes/Theme";

export const Home = () => {
  const navigation = useNavigation<TNavigationScreenProps>();

  return (
    <View style={{ backgroundColor: Theme.colors.background }}>
      <Text
        style={{
          fontFamily: Theme.fonts.interRegular,
          fontSize: Theme.fontSizes.title,
          color: Theme.colors.text,
        }}
      >
        Home Page
      </Text>

      <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <Text style={{ color: Theme.colors.text }}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};
