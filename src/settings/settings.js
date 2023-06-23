import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import { useState, useRef} from "react";
import { icons } from "../../constants";
import { Switch } from "react-native-gesture-handler";
import styles from "./settings.styles";
import ScreenHeaderBtn from "../headerInfo/ScreenHeaderBtn";
import Profile from "./profile";
import BottomBar from "../home/BottomBar";

const SECTIONS = [
    {
        header: 'Preferences',
        items: [
            { id: 'darkMode', icon: 'moon', label: 'Dark Mode', type: 'toggle'},
            { id: 'notifications', icon: 'bell', label: 'Notifications', type: 'select'}
        ]
    },
    {
        header: 'Help',
        items: [
            { id: 'report', icon: 'flag', label: 'Report User', type: 'link'},
            { id: 'contact', icon: 'mail', label: 'Contact Us', type: 'link'},
        ]
    }
]

const Settings = ({navigation}) => {
    const scrollViewRef = useRef(null);

    const handlePress = (id) => {
        if (id==='notifications'){
            navigation.navigate('notifSettings')
        }
    };

    const [form, setForm] = useState({
        language: 'English',
        darkMode: false,
    })
    return(
        <SafeAreaView style={{flex:1, backgroundColor: '#F4EEE0'}}>
            <ScrollView contentContainerStyle={styles.container}>
                {/* <View style={styles.header}>
                    <Text style={styles.title}>Settings</Text>
                    <Text style={styles.subtitle}>Update your preferences here</Text>
                </View>  */}

                <Profile/>

                {SECTIONS.map(({header, items}) => (
                    <View style={styles.section} key={header}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionHeaderText}>{header}</Text>
                        </View>

                        <View style={styles.sectionBody}>
                            {items.map(({ label, id, type, icon }, index) =>(
                                <View 
                                style={[
                                    styles.rowWrapper,
                                    index===0 && {borderTopWidth: 0},]} key = {id}>
                                    {/* handleOnPress */}
                                    <TouchableOpacity onPress={()=>{handlePress(id)}}> 
                                        <View style={styles.row}>
                                            <Text style={styles.rowLabel}>{label}</Text>

                                            <View style={styles.rowSpacer} />
                                            {type ==='select' && (
                                                <Text style={styles.rowValue}>{form[id]}</Text>
                                            )}

                                            {type ==="toggle"&& (
                                                <Switch 
                                                    value={form[id]}
                                                    onValueChange={value => setForm({...form, [id]:value})}
                                                />
                                            )}

                                            {['select', 'link'].includes(type) && (
                                                // <FeatherIcon
                                                // name='chevron-right'
                                                // color="#ababab"
                                                // size={22}
                                                // />
                                                <ScreenHeaderBtn iconUrl={icons.chevronRight} dimension="60%" backgroundColor='#fff'/>
                                                
                                            )}
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </View>
                ))}
            </ScrollView>
            {/* <BottomBar/> */}
        </SafeAreaView>
    )
    
}

export default Settings;


