import { View, Image, Modal } from "react-native";
import { Text, Button, Card } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from '@react-native-picker/picker';
import { AntDesign, Fontisto, FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { IPAddr } from "../shared/IPAddr";
import { TouchableOpacity } from "react-native-gesture-handler";
export default function CourseListComponent(props)
{
    var [ currentSemester, setCurrentSemester ] = useState("");
    var [ semesterList, setSemesterList ] = useState([]);
    var [ courses, setCourses ] = useState([]);
    var [ choseCourse, setChoseCourse ] = useState({});
    var [ showClassInfoModal, setShowClassInfoModal ] = useState(false);

    var { navigate } = props.navigation;
    var { account } = props.route.params;

    useEffect(() => {
        loadSemesters();
    }, []);

    function getCoursesOfSemester()
    {
        //console.log(`classes/${currentSemester}/${account.accountId}`);
        fetch(IPAddr + `classes/${currentSemester}/${account.accountId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(async (respond) => {
            setCourses(await respond.json());
            //console.log(courses);
        })
    }
    function loadSemesters()
    {
        fetch(IPAddr + "semesters", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(async (respond) => {
            var semesters = await respond.json();
            setSemesterList(semesters);
            if (semesters.length > 0)
            {
                setCurrentSemester(semesters[0]);
                getCoursesOfSemester();
            }
        })
    }

    return (
        <SafeAreaView>
            <View style={{flexDirection: "row"}}>
                <Button iconRight={true} type="clear" onPress={() => navigate("Home")}>
                    Trang chủ
                    <AntDesign name="arrowleft" color="#457EE5" size={24}/>
                </Button>
                <View />
            </View>
            <View style = {{ marginVertical: 15 }} />
            <Text style = {{ textAlign: "center", fontWeight: "bold", color: "#457EE5", fontSize: 20 }}>{account.name} - {account.accountId}</Text>
            <View style = {{ marginTop: 10, marginBottom: 5 }} />
            <Picker style = {{ width: 200 }} selectedValue={currentSemester} 
                    onValueChange={(sem, idx) => {
                        setCurrentSemester(sem);
                        //loadSemesters();
                        getCoursesOfSemester();
                    }}>
                {semesterList.map((s, i) => (
                    <Picker.Item key={i} label={`Học kỳ ${s}`} value={s} />
                ))}
            </Picker>
            <View style = {{ marginBottom: 50 }}/>
            {courses.map((s, i) => (
                <CourseComponent courseInfo = {s} account = {account} navigate = {navigate}/>
            ))}
        </SafeAreaView>
    )
}

function CourseComponent(props)
{
    var { courseInfo, account, navigate } = props;
    var [ showModal, setShowModal ] = useState(false);
    //console.log("course component props:", props);
    return (
        <TouchableOpacity onPress = { () => {
            setShowModal(true);
        }}>
            <View style = {{ marginHorizontal: 25, justifyContent: "center",
            elevation: 10, borderRadius: 10, backgroundColor: "#fff"
            }}>
                <Image source={require("../assets/class_course.jpg")} style={{ width: 310, height: 200 }}/>
                <View style = {{ marginHorizontal: 10 }}>
                    <Text style = {{ fontWeight: "bold" }}>Lớp: {courseInfo.name}</Text>
                    <Text>Số hiệu: {courseInfo.classId}</Text>
                    <Text>Giảng viên: {courseInfo.teacherId}</Text>
                </View>
            </View>
            <Modal visible = {showModal} onRequestClose = {() => setShowModal(false)}>
                <StudentClassDetail courseInfo = {courseInfo} account = {account} navigate = {navigate}/>
            </Modal>
        </TouchableOpacity>
    )
}

function StudentClassDetail(props)
{
    //console.log("std props: ", props)
    var { courseInfo, account, navigate } = props;
    var [ stdClassDetail, setStdClassDetail ] = useState({});
    
    useEffect(() => {
        getStudentClassDetail(account.accountId);
    }, [])

    function getStudentClassDetail(studentId)
    {
        //console.log(`/stdclasses/${courseInfo.classId}/${studentId}`);
        fetch(IPAddr + `stdclasses/${courseInfo.classId}/${studentId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(async (respond) => {
            setStdClassDetail(await respond.json())
            //console.log(stdClassDetail);
        })
    }
    return (
        <View>
            <View style={{flexDirection: "row"}}>
                <Button iconRight={true} type="clear" onPress={() => navigate("Home")}>
                    Quay về
                    <AntDesign name="arrowleft" color="#457EE5" size={24}/>
                </Button>
                <View />
            </View>
            <Card>
                <Card.Title style = {{ fontSize: 20 }}>{account.name} - {account.accountId}</Card.Title>
                <View style={{flexDirection: "row", justifyContent: "space-between", marginVertical: 10}}>
                    <Text>Lớp</Text>
                    <Text style={{fontSize: 15, fontWeight: "bold"}}>{courseInfo.name}</Text>
                </View>
                <View style={{flexDirection: "row", justifyContent: "space-between", marginVertical: 10}}>
                    <Text>Số hiệu</Text>
                    <Text style={{fontSize: 15, fontWeight: "bold"}}>{courseInfo.classId}</Text>
                </View>
                <Card.Divider />
                <View style={{flexDirection: "row", justifyContent: "space-between", marginVertical: 10}}>
                    <Text>Điểm thành phần 1 ({courseInfo.grade01_weight}%)</Text>
                    <Text style={{fontSize: 15, fontWeight: "bold"}}>{stdClassDetail.grade01}</Text>
                </View>
                <View style={{flexDirection: "row", justifyContent: "space-between", marginVertical: 10}}>
                    <Text>Điểm thành phần 2 ({courseInfo.grade02_weight}%)</Text>
                    <Text style={{fontSize: 15, fontWeight: "bold"}}>{stdClassDetail.grade02}</Text>
                </View>
                <View style={{flexDirection: "row", justifyContent: "space-between", marginVertical: 10}}>
                    <Text>Điểm thành phần 3 ({courseInfo.grade03_weight}%)</Text>
                    <Text style={{fontSize: 15, fontWeight: "bold"}}>{stdClassDetail.grade03}</Text>
                </View>
                <View style={{flexDirection: "row", justifyContent: "space-between", marginVertical: 10}}>
                    <Text>Điểm thành phần 4 ({courseInfo.grade04_weight}%)</Text>
                    <Text style={{fontSize: 15, fontWeight: "bold"}}>{stdClassDetail.grade04}</Text>
                </View>
                <View style={{flexDirection: "row", justifyContent: "space-between", marginVertical: 10}}>
                    <Text>Điểm tổng (100%)</Text>
                    <Text style={{fontSize: 15, fontWeight: "bold"}}>{stdClassDetail.grade_total}</Text>
                </View>
            </Card>
        </View>
    )
}