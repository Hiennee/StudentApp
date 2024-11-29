import { View, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, Button } from "@rneui/themed";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { IPAddr } from "../shared/IPAddr";

export default function LoginComponent(props)
{
    var { navigate } = props.navigation;
    var [ email, setEmail ] = useState("");
    var [ password, setPassword ] = useState("");

    var onSubmitLogin = (email, password) => {
        fetch(IPAddr + "login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email.trim().toLowerCase(),
                password
            })
        }).then(async (respond) => {
            if (respond.status == 200)
            {
                console.log("Logged in");
                setEmail("");
                setPassword("");
                navigate("Bridge", {
                    account: await respond.json(),
                })
            }
            else if (respond.status == 300)
            {
                Alert.alert("Thông báo", "Sai email sinh viên hoặc mật khẩu");
            }
            else
            {
                Alert.alert("Có gì đó sai sai");
            }
        })
    }

    return (
        <SafeAreaView style={{ backgroundColor: "#e7e4e42d", height: "100vh", width: "100vh" }}>
            <Text style={{ textAlign: "center", fontWeight: "bold", justifyContent: "center", fontSize: 50, paddingTop: 150, paddingBottom: 30 }}>Đăng nhập</Text>
            <Input placeholder='Email sinh viên...' value = { email } onChangeText={(txt) => { setEmail(txt) } } 
                leftIcon={ <AntDesign name="user" size={24}/> }/>
            <Input placeholder='Mật khẩu...' value={password} secureTextEntry={true} onChangeText={(txt) => { setPassword(txt) }} 
                leftIcon={ <AntDesign name="eyeo" size={24}/> } />
            <View style={{ flexDirection:"row", justifyContent:"center", marginTop: 70 }}>
                <Button title="ĐĂNG NHẬP" disabled={email == "" || password == ""} onPress={() => { onSubmitLogin(email, password); }}></Button>
                <View style={{ paddingHorizontal: 20 }}/>
                <Button title="QUAY LẠI" color="warning" onPress={() => navigate("Greetings")}></Button>
            </View>
        </SafeAreaView>
    )
}