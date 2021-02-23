import React, { Component,createRef  } from 'react'
import ActionSheet from "react-native-actions-sheet";
import {View, Text, TouchableOpacity, StyleSheet, Image, ScrollView} from "react-native";
import Avatar from "./Avatar"
import Add from "./Add"

import Svg, { Path } from 'react-native-svg';

const actionSheetRef = createRef();
const actionSheetRefAdd = createRef();
const actionSheetRefEdit = createRef();
const actionSheetRefDel = createRef();

export default class List extends Component {
    constructor(props){
        super(props);
        this.state = {
            primary: 0,
        }
        this.addData = this.addData.bind(this)
    }

    componentDidMount(){
        this.setState({primary:this.props.storage["primary"]})
    }

    onPress(url){
        this.props.update(url);
        actionSheetRef.current?.setModalVisible();
    }
    onPress2(index){
        this.props.updatePrimary(index);
        this.setState({primary:index})
        actionSheetRefEdit.current?.setModalVisible();
    }

    addData(data){
        this.props.getValue(data)
        actionSheetRefAdd.current?.setModalVisible();
    }

    render() {
        const primary = this.state.primary;
        const data = this.props.storage["data"];
        return (
            
            <View
            style={{
                justifyContent: "center",
            }}
            >
                <TouchableOpacity 
                    onPress={() => {
                        actionSheetRef.current?.setModalVisible();
                        }}
                    style={styles.Button}
                >
                    <View style={styles.Horizontal}></View>
                    <View style={styles.Vertical}></View>
                </TouchableOpacity>

                <ActionSheet ref={actionSheetRef}>
                    {data.length!=0 ?  
                    <ScrollView>
                        <View style={styles.ModifyIcons}>
                            <TouchableOpacity 
                                onPress={() => {
                                    actionSheetRefAdd.current?.setModalVisible();
                                    }}    
                            >
                                <Image
                                style={{width: 40, height: 40, marginTop:5}}
                                source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX-tpUzwj7G1hmHsZ0RTkoSwEoPRraGiY1sw&usqp=CAU'}}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    actionSheetRefEdit.current?.setModalVisible();
                                    }} 
                            >
                                <Image
                                style={{width: 50, height: 50}}
                                source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEX///8AAAD09PTY2NjU1NTu7u5tbW1ZWVnx8fEnJyf19fVsbGwpKSk3NzcjIyNcXFwaGhoVFRUwMDC7u7uMjIykpKSVlZXIyMhFRUVPT0/j4+NKSkre3t5iYmIRERHHx8d7e3t/f388PDytra2ZmZkWJ9VpAAAEvElEQVR4nO2c6XbiMAyFk7CFUAoFAmUrUHj/ZxwI2MhrcjIMsTL3+9c47dFFkiUvNIoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAlrLJF/3t/rQ8JE1b8k/Ilr+xZLRq2pzXk09jhcGuaYteS/YdG+RNG/VKdl+mwDg+Nm3W6+ja9F2ZNG3Yq+g4BLZGolvgdb5p2rhXoIbodr+ftUwiFfiTp9cn2e7YpkClIbrOxNNVeyRSgXvHc9aB2nUIVEcYS6Se6nvG9tbfZoBSJgwVLQhUrZMxVLhDmAlGq2ZMmtSLyyZM/DssnYw3UOdNGPk3WFs1I1DJW8PM9mfCxbGa8OUir+UiFdj31gUy2IShddHqIP3RmG6eH8ahCVPr0VUFljQwuRg5vd/SmhgC1UeGF+Vq6t2G1oXG5Mj2UM/FBTOFjl7U06PJpRSPfWIajyPXwMD+Kyx2UC05KHAGqvRh752W1sSag7ZBOt3IyfSNhtbFtx6MnLm45aPQmYO2F6TEg+czCYwSD+qvPHIxlRv+wa8uKgi05GL23D0NfXHhmUVdr10DNXmeKYbetFUUqO1d9MihW+C1wlsm3K8SLu8xtC6eHEyNGcQqseRjaRpPmUim5iRp2QAYv83WWnhyMCtO70u9+BF2EnpCNHlcTyiROEzfZmwdfDnorOYdejNjGPayyZODGbmfoN2fScckRPl4UBdI/LRVh1JyDjzkm4PEg2tt6JNliOo5SDyobVv0iAc/2QrMftwCaQ7yCVFPDn6rQ8kH8SAfgXqIuj2Y8sxBS6tWIUQDL/SlrdodbRZNeeago1WzCFTKBFsP+soEnWT45OD/XCa0Vi2hhZ6PQE+Z0CeZ1peJdrRq7ma7/TlIZ9Gwy0SlFb0ZosNW5KBHIM8Vfb1Wje+KvldxRR+2B3tugdHcHaJ8ykR0dAskp/F8W7Uoe874R8vwQ6K+oufTqilZeLSNryweVFq10I9Ao4snDQtWnFf0NyZxmcSDFqKccvBKFselElUS2smE78HnrZCqEumKPvBW7c5CU1h2bMuoVXvwqSv0e5HR4cuD1BDolcioVRPItmzxU0Gi0qoFXwfv9IXBaYWrM8zKxB0RdeMK97sYHb48kaouUen9IEa7agR5zbU4kPcGKrNWTSBbtvuPvl19jjlIdpnE9WVnLjIsEwXSZ7nxRJXI6PBFRbZsG/nIuu3Gr1UTiHugM/LMEqisVvQKiTD7SJ8aEnmWiQLZsqn307Rc5LSrpiN32Tbqc0Uiy1ZNIAz/1gccV5p55eCVnbB8YQxZJTLLwStnYbrlf5B1fwyBvMpEgdayqSwND3IL0SjKRBFY6yOd3PwvZZxaNYHZst3YnPuGuphfmSiQcSi/5Nk7HH9t8hiWiYKBmobdpUNdzLBMFMhdttPtv1cOnOpuHuQYovQrkKehT971BSa7ajrGZreN9bK7YhmhN6Zl6qan4L/+6aXnVfexP2/K/0bYnN3yJpcO08xTGNnVzRYrnhOnydhU99WfM2zNnKy1aWWSd5o26cWQu0DxetFtk/ME+4e847wtiWcwH8wm/GsCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaBN/AIRiK/yTIZQQAAAAAElFTkSuQmCC'}}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.Container}>
                            <TouchableOpacity style={styles.ListItem} onPress={() =>this.onPress(data[primary].link)}>
                                <Avatar name={data[primary].name}/>
                                <View style={styles.SiteContainer}>
                                    <Text style={styles.SiteName}> 
                                        {data[primary].name}   
                                    </Text>
                                    <Text style={styles.SiteLink}>
                                        {data[primary].link}
                                    </Text>
                                </View>
                                <Text style={styles.Primary}>P</Text>
                                <TouchableOpacity 
                                style={styles.Delete} 
                                onPress={() => {
                                    actionSheetRefDel.current?.setModalVisible();
                                    this.props.delData(primary)
                                    }}
                                >
                                    <Image
                                    style={{height:24,width:24}}
                                    source={{uri: 'data:image/png;base64,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'}}
                                    />
                                </TouchableOpacity>
                            </TouchableOpacity>
                            {data.map((item,i)=>(
                                    i !== primary && 
                                    <View key={i}>
                                    <TouchableOpacity style={styles.ListItem} onPress={()=> this.onPress(item.link)}>
                                        <Avatar name={item.name}/>
                                        <View style={styles.SiteContainer}>
                                            <Text style={styles.SiteName}> 
                                                {item.name}   
                                            </Text>
                                            <Text style={styles.SiteLink}>
                                                {item.link}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                    style={styles.Delete}
                                    onPress={() => {
                                        actionSheetRefDel.current?.setModalVisible();
                                        this.props.delData(i)
                                        }}
                                    >
                                        <Image
                                        style={{height:24,width:24}}
                                        source={{uri: 'data:image/png;base64,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'}}
                                        />
                                    </TouchableOpacity>
                                    </View>
                                ))}
                        </View>
                        <ActionSheet ref={actionSheetRefAdd}>
                            <ScrollView style={{height:600}}>
                                <Add addData={this.addData}></Add>
                            </ScrollView>
                        </ActionSheet>
                        <ActionSheet ref={actionSheetRefEdit}>
                            <ScrollView style={styles.PrimaryContainer}>
                                <Text style={styles.UpdateText}>Update Primary</Text>
                                <TouchableOpacity style={styles.ListItem} onPress={()=> this.onPress2(primary)}>
                                    <Avatar name={data[primary].name}/>
                                    <View style={styles.SiteContainer}>
                                        <Text style={styles.SiteName}> 
                                            {data[primary].name}   
                                        </Text>
                                        <Text style={styles.SiteLink}>
                                            {data[primary].link}
                                        </Text>
                                    </View>
                                    <Text style={styles.CurrentPrimary}>Primary</Text>
                                </TouchableOpacity>
                                {data.map((item,i)=>( 
                                    i !== primary &&
                                    <TouchableOpacity style={styles.ListItem} key={i} onPress={()=> this.onPress2(i)}>
                                        <Avatar name={item.name}/>
                                        <View style={styles.SiteContainer}>
                                            <Text style={styles.SiteName}> 
                                                {item.name}   
                                            </Text>
                                            <Text style={styles.SiteLink}>
                                                {item.link}
                                            </Text>
                                        </View>
                                        <Text style={styles.MakePrimary}>Make Primary</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </ActionSheet>
                        <ActionSheet ref={actionSheetRefDel}>
                            <View style={{height:80}}>
                                <TouchableOpacity style={styles.DelButton} onPress={()=>this.props.confirmDel()}>
                                    <Text style={styles.DelButtonText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </ActionSheet>
                    </ScrollView>
                    :
                    <ScrollView style={{height:600}}>
                        <Add addData={this.addData}></Add>
                    </ScrollView>
                    }
                </ActionSheet>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Button:{
        borderColor:'rgb(2555,255,255)',
        borderWidth:5,
        alignItems:'center',
        justifyContent:'center',
        width:60,
        position: 'absolute',                                          
        bottom: 25,                                                    
        right: 20,
        height:60,
        backgroundColor:'#0080ff',
        borderRadius:100
    },
    Horizontal:{
        backgroundColor:"white", 
        height:5,width:30, 
        borderRadius:100,
        margin:"auto",
        position:"absolute"
    },
    Vertical:{
        backgroundColor:"white", 
        height:30,width:5, 
        borderRadius:100,
        margin:"auto",
        position:"absolute"
    },
    ModifyIcons:{
        display:"flex",
        paddingRight:8,
        flexDirection:"row",
        justifyContent:"flex-end"
    },
    Edit:{
        textAlign:"right",
        padding:15,
        fontSize:15
    },
    EditImage:{
        width: 25, 
        height: 25, 
    },
    Container:{
        height:350,
        paddingHorizontal:15
    },
    ListItem:{
        display:"flex",
        flexDirection: 'row',
        alignItems: "center",
        marginBottom:10
    },
    MiniImage:{
        width: 40, 
        height: 40, 
        marginTop:15
    },
    SiteContainer:{
        paddingLeft: 15,
        paddingTop:10,
    },
    SiteName:{
        fontSize:18,
    },
    SiteLink:{
        color:"gray",
        padding:0
    },
    Primary:{
        fontSize: 22,
        textAlign:"right",
        fontWeight:"900",
        paddingRight:55,
        flex:1,
        color:"#0080aa"
    },
    Delete:{
        paddingRight:0,
        position:"absolute",
        width:30,
        margin:"auto",
        height:30,
        right:0,
        bottom:10
    },
    PrimaryContainer:{
        height:350,
        padding:15
    },
    UpdateText:{
        textAlign:"center",
        fontSize:18,
    },
    CurrentPrimary:{
        fontSize: 18,
        textAlign:"right",
        fontWeight:"600",
        paddingRight:15,
        flex:1,
        color:"#c21808"
    },
    MakePrimary:{
        fontSize: 18,
        textAlign:"right",
        fontWeight:"600",
        paddingRight:15,
        flex:1,
        color:"#0dac50"
    },
    DelButton:{
        marginVertical:10,
        marginHorizontal:15,
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    DelButtonText:{
        height:50,
        width:"100%",
        backgroundColor:"#EE4B2B",
        color:"white",
        fontSize:25,
        fontWeight:"800",
        textAlign:"center",
        padding:8,
        borderRadius:10
    }
})