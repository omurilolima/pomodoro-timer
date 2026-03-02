import { useNavigation } from "@react-navigation/native"
import { Text, TouchableOpacity, View } from "react-native"
import { TNavigationScreenProps } from "../appRoutes"


export const Home = () => {

    const navigation = useNavigation<TNavigationScreenProps>()

    return (
        <View>
            <Text style={{ fontFamily: 'InterRegular', fontSize: 56 }}>
                Home Page
            </Text>

            <TouchableOpacity onPress={ () => navigation.navigate('Settings') }>
                <Text>Settings</Text>
            </TouchableOpacity>
        </View>
    )
}