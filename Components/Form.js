import React, { Component,createRef  } from 'react'
import ActionSheet from "react-native-actions-sheet";
import {View, Text, TouchableOpacity, StyleSheet, Image,Dimensions} from "react-native"

const actionSheetRef = createRef();

export default class Form extends Component {

    onPress(url){
        this.props.update(url);
        actionSheetRef.current?.setModalVisible();
    }

    render() {
        const primary = this.props.storage["primary"];
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
                    <TouchableOpacity>
                        <Text style={styles.Edit}>
                            Edit
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.Container}>
                        <TouchableOpacity style={styles.ListItem} onPress={() =>this.onPress(data[primary].link)}>
                            <Image
                                style={styles.MiniImage}
                                source={{uri: "data:image/png;base64,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"}}
                                // resizeMode={'cover'}
                            />
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
                                <Image
                                    style={styles.MiniImage}
                                    source={{uri: "data:image/png;base64,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"}}
                                    // resizeMode={'cover'}
                                />
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
    }
})