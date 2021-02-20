import React, { Component } from 'react'
import { View, Text, StyleSheet} from "react-native"

export default class Avatar extends Component {

    symbol(name){
        let data = name.split(" ");
        let initials= data[0][0];
        if (data.length > 1){
            initials+=data[1][0]
        } 
        return initials;
    }

    render() {
        return (
            <View style={styles.CircleBackground}>
                <Text style={styles.letter}>
                    {this.symbol(this.props.name)}
                </Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    CircleBackground:{
        marginTop:10,
        width:45,
        height:45,
        borderRadius:100,
        backgroundColor:"#4ca3dd",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    letter:{
        fontSize:22,
        fontWeight:"900",
        color:"white",
        textAlign:"center"
    }
})
