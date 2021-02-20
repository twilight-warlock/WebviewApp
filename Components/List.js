import React, { Component,createRef  } from 'react'
import ActionSheet from "react-native-actions-sheet";
import {View, Text, TouchableOpacity, StyleSheet, Image, ScrollView} from "react-native";
import Avatar from "./Avatar"
import Add from "./Add"


const actionSheetRef = createRef();
const actionSheetRefAdd = createRef();
const actionSheetRefDel = createRef();

export default class List extends Component {
    constructor(props){
        super(props);
        this.state = {
            primary: 0
        }
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
        actionSheetRefDel.current?.setModalVisible();
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
                    <ScrollView>
                    <View style={styles.ModifyIcons}>
                        <TouchableOpacity 
                            onPress={() => {
                                actionSheetRefAdd.current?.setModalVisible();
                                }}    
                        >
                            <Text style={styles.Edit}>
                                Add
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                actionSheetRefDel.current?.setModalVisible();
                                }} 
                        >
                            <Text style={styles.Edit}>
                                Edit
                            </Text>
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
                        </TouchableOpacity>
                        {data.map((item,i)=>(
                                i !== primary && 
                                <TouchableOpacity style={styles.ListItem} key={i} onPress={()=> this.onPress(item.link)}>
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
                            ))}
                    </View>
                    <ActionSheet ref={actionSheetRefAdd}>
                        <ScrollView style={{height:800}}>
                            <Add storeData={this.props.storeData}></Add>
                        </ScrollView>
                    </ActionSheet>
                    <ActionSheet ref={actionSheetRefDel}>
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
                    </ScrollView>
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
        paddingRight:15,
        flex:1,
        color:"#0080aa"
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
})