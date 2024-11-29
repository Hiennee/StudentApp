import { SafeAreaView, Text, View, Alert, TouchableOpacity, AppState } from "react-native"
import { Avatar, Divider, Button } from "@rneui/themed"
import { FontAwesome5, Entypo } from '@expo/vector-icons';
import { useState, useEffect } from "react";

export default function HomeComponent(props)
{
    
    const { navigate } = props.navigation
    const { account } = props;
    //console.log(props)
    
    return (
        <SafeAreaView style={{ backgroundColor: props.theme }} flex={1}>
            <Text style={{ textAlign:"center", marginTop: 20, fontWeight: "bold", fontSize: 30 }}>Ứng dụng cho sinh viên</Text>
            <View style={{ flexDirection: "row", paddingLeft: 50, marginTop: 50, paddingTop: 20, paddingBottom: 20, backgroundColor: "white", borderRadius: 25 }}>
                <Avatar size={80} rounded source={
                    account.avatar == "" || account.avatar == null ?
                    require("../assets/default_avatar_icon.png") : {
                        uri: `data:image/png;base64,${account.avatar}`
                }} iconStyle={{}}>
                    <Avatar.Accessory size={24} />
                </Avatar>
                <View style={{flexDirection: "column"}}>
                    <Text style ={{marginLeft: 20, fontWeight: "bold", fontSize: 20}}>{account.name}</Text>
                    <Text style ={{marginLeft: 20, fontWeight: "bold", fontSize: 20}}>{account.email}</Text>
                </View>
            </View>
            <Divider width={2} color="grey" inset insetType="middle" style={{ marginVertical: 20 }}/>
            <View style={{ backgroundColor: "white", width: "100vh", height: "50vh", paddingHorizontal: 50, paddingBottom: 400, borderRadius: 25}}>
                <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 50 }}>
                    <View style={{ flexDirection: "column", justifyContent: "center"}}>
                        <TouchableOpacity onPress={() => navigate("CourseList", {
                            account,
                        })} >
                            <Entypo name="open-book" size={35} color="black" />
                        </TouchableOpacity>
                        <Text style={{ marginLeft:-10 }}>Danh sách lớp</Text>
                    </View>
                    <View style={{ flexDirection: "column", justifyContent: "center"}}>
                        <TouchableOpacity onPress={() => {
                            props.navigation.goBack();
                        }} >
                            <FontAwesome5 name="door-open" size={24} color="black" />
                        </TouchableOpacity>
                        <Text style={{ marginLeft:-10 }}>Đăng xuất</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}


