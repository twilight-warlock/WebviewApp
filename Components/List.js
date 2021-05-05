import React, { Component, createRef } from 'react'
import ActionSheet from "react-native-actions-sheet";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import Avatar from "./Avatar"
import Add from "./Add"

const actionSheetRef = createRef();
const actionSheetRefAdd = createRef();
const actionSheetRefEdit = createRef();
const actionSheetRefDel = createRef();

export default class List extends Component {

    UpdateWebViewData = (data) => {
        this.props.update(data);
        actionSheetRef.current?.setModalVisible();
    }
    
    PrimaryOnPress = (index) => {
        this.props.updatePrimary(index);
        this.setState({ primary: index })
        actionSheetRefEdit.current?.setModalVisible();
    }

    addData = (data) => {
        console.log(this.props.storage.data);
        if(this.props.storage.data.length) {
            actionSheetRefAdd.current?.setModalVisible();
        }
        this.props.AddWebsite(data);
    }

    onDeletePress = () => {
        if(this.props.storage.data.length !== 1) {
            actionSheetRefDel.current?.setModalVisible();
        }
        this.props.confirmDel();
    }

    render() {
        const primary = this.props.storage.primary;
        const data = this.props.storage.data;
        return (

            <View
                style={{
                    justifyContent: "center",
                }}
            >
                <TouchableOpacity
                    onPress={() => actionSheetRef.current?.setModalVisible()}
                    style={styles.Button}
                >
                    <View style={styles.Horizontal}></View>
                    <View style={styles.Vertical}></View>
                </TouchableOpacity>

                <ActionSheet ref={actionSheetRef}>
                    {Array.isArray(data) && data.length ?
                        <ScrollView>
                            <View style={styles.ModifyIcons}>
                                <TouchableOpacity onPress={() => {
                                    actionSheetRefAdd.current?.setModalVisible();
                                }}>
                                    <Image
                                        style={{ width: 40, height: 40, marginTop: 5 }}
                                        source={require('../assets/plus.png')}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    actionSheetRefEdit.current?.setModalVisible();
                                }}>
                                    <Image
                                        style={{ width: 50, height: 50 }}
                                        source={require('../assets/edit.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                            <ScrollView style={styles.Container}>
                                {
                                    data.map((item, index) => {
                                        if(index === primary) {
                                            return (
                                                <View key={index}>
                                                    <TouchableOpacity style={styles.ListItem} onPress={() => this.UpdateWebViewData(data[primary])}>
                                                        <Avatar name={data[primary].name} />
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
                                                                style={{ height: 24, width: 24 }}
                                                                source={require('../assets/trash.png')}
                                                            />
                                                        </TouchableOpacity>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        } else {
                                            return (
                                                <View key={index}>
                                                    <TouchableOpacity style={styles.ListItem} onPress={() => this.UpdateWebViewData(item)}>
                                                        <Avatar name={item.name} />
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
                                                            this.props.delData(index)
                                                        }}
                                                    >
                                                        <Image
                                                            style={{ height: 24, width: 24 }}
                                                            source={require('../assets/trash.png')}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        }
                                    })
                                }
                            </ScrollView>
                            <ActionSheet ref={actionSheetRefAdd}>
                                <ScrollView style={{ height: 600 }}>
                                    <Add addData={this.addData}></Add>
                                </ScrollView>
                            </ActionSheet>
                            <ActionSheet ref={actionSheetRefEdit}>
                                <ScrollView style={styles.PrimaryContainer}>
                                    <Text style={styles.UpdateText}>Update Primary</Text>
                                    {
                                        data.map((item, index) => {
                                            if(index === primary) {
                                                return (
                                                    <TouchableOpacity key={index.toString()} style={styles.ListItem} onPress={() => this.PrimaryOnPress(primary)}>
                                                        <Avatar name={data[primary].name} />
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
                                                )
                                            } else {
                                                return (
                                                    <TouchableOpacity style={styles.ListItem} key={index.toString()} onPress={() => this.PrimaryOnPress(index)}>
                                                        <Avatar name={item.name} />
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
                                                )
                                            }
                                        })
                                    }
                                </ScrollView>
                            </ActionSheet>
                            <ActionSheet ref={actionSheetRefDel}>
                                <View style={{ height: 80 }}>
                                    <TouchableOpacity style={styles.DelButton} onPress={this.onDeletePress}>
                                        <Text style={styles.DelButtonText}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </ActionSheet>
                        </ScrollView>
                        :
                        <ScrollView style={{ height: 600 }}>
                            <Add addData={this.addData}></Add>
                        </ScrollView>
                    }
                </ActionSheet>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Button: {
        borderColor: 'rgb(2555,255,255)',
        borderWidth: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        position: 'absolute',
        bottom: 25,
        right: 20,
        height: 60,
        backgroundColor: '#0080ff',
        borderRadius: 100
    },
    Horizontal: {
        backgroundColor: "white",
        height: 5, width: 30,
        borderRadius: 100,
        margin: "auto",
        position: "absolute"
    },
    Vertical: {
        backgroundColor: "white",
        height: 30, width: 5,
        borderRadius: 100,
        margin: "auto",
        position: "absolute"
    },
    ModifyIcons: {
        display: "flex",
        paddingRight: 8,
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    Edit: {
        textAlign: "right",
        padding: 15,
        fontSize: 15
    },
    EditImage: {
        width: 25,
        height: 25,
    },
    Container: {
        height: 350,
        paddingHorizontal: 15
    },
    ListItem: {
        display: "flex",
        flexDirection: 'row',
        alignItems: "center",
        marginBottom: 10
    },
    MiniImage: {
        width: 40,
        height: 40,
        marginTop: 15
    },
    SiteContainer: {
        paddingLeft: 15,
        paddingTop: 10,
    },
    SiteName: {
        fontSize: 18,
    },
    SiteLink: {
        color: "gray",
        padding: 0
    },
    Primary: {
        fontSize: 22,
        textAlign: "right",
        fontWeight: "900",
        paddingRight: 55,
        flex: 1,
        color: "#0080aa"
    },
    Delete: {
        paddingRight: 0,
        position: "absolute",
        width: 30,
        margin: "auto",
        height: 30,
        right: 0,
        bottom: 10
    },
    PrimaryContainer: {
        height: 350,
        padding: 15
    },
    UpdateText: {
        textAlign: "center",
        fontSize: 18,
    },
    CurrentPrimary: {
        fontSize: 18,
        textAlign: "right",
        fontWeight: "600",
        paddingRight: 15,
        flex: 1,
        color: "#c21808"
    },
    MakePrimary: {
        fontSize: 18,
        textAlign: "right",
        fontWeight: "600",
        paddingRight: 15,
        flex: 1,
        color: "#0dac50"
    },
    DelButton: {
        marginVertical: 10,
        marginHorizontal: 15,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    DelButtonText: {
        height: 50,
        width: "100%",
        backgroundColor: "#EE4B2B",
        color: "white",
        fontSize: 25,
        fontWeight: "800",
        textAlign: "center",
        padding: 8,
        borderRadius: 10
    }
})