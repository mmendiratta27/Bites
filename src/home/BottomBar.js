    
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "react-native-vector-icons/MaterialIcons";
import { View } from "react-native";
import { COLORS, icons, images, SIZES } from "../../constants";
import { useNavigation } from '@react-navigation/native';

    
const BottomBar =({}) => {
    const navigation = useNavigation();

    return(
        <View
        style={{
        backgroundColor: "#F4EEE0",
        padding: SIZES.medium,
        alignItems: "flex-end",
        justifyContent: "space-between",
        flexDirection: "row",
        }}
        >
            <Icon.Button
            name="home-outline"
            color="#353535"
            size={25}
            backgroundColor="transparent"
            onPress={() => navigation.navigate("homeScreen")}

            />
            <Icon.Button
            name="crown-outline"
            color="#353535"
            size={25}
            backgroundColor="transparent"
            // onPress={() => navigation.navigate("Achievements")}
            />
            <Icons.Button
            name="add-circle-outline"
            color="#353535"
            size={25}
            backgroundColor="transparent"
            onPress={() => navigation.navigate("AddPost")}
            />
            <Icon.Button
            name="message-processing-outline"
            color="#353535"
            size={25}
            backgroundColor="transparent"
            onPress={() => navigation.navigate("ChatHome")}
            />
            <Icon.Button
            name="cog-outline"
            color="#353535"
            size={25}
            backgroundColor="transparent"
            onPress={() => navigation.navigate("Settings")}
            />
        </View>

    )
    
}
export default BottomBar;
   