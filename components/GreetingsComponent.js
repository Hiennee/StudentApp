import { View } from "react-native";
import { Button, Text } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GreetingsComponent(props)
{
    var { navigate } = props.navigation;
    return (
        <SafeAreaView style = {{ backgroundColor: "#e7e4e42d", height: "100vh", width: "100vh" }}>
            <View style={{ marginVertical: 150 }}/>
            <Text style = {{ fontSize: 30, fontWeight: "bold", textAlign: "center"
                , justifyContent: 'center'
             }}>Ứng dụng quản lý giành cho sinh viên</Text>
             <View style={{ marginTop: 30 }}/>
            <Button onPress = {() => navigate("Login")} title="Đăng nhập"></Button>
        </SafeAreaView>
    )
}