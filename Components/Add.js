import React, { Component } from 'react'
import {TextInput, View, Text, Button, StyleSheet} from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Add extends Component {
    constructor(props){
        super();
        this.state = {
            name:"",
            username:"",
            password:"",
            url:"",
            message:"",
            color1:"white",
            color2:"white",
            color3:"white",
            color4:"white",
        }
    }

    isUrlValid(userInput) {
        var regexQuery = "/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi";
        var url = new RegExp(regexQuery,"g");
        if (url.test(userInput)) {
            return true;
        }
        return false;
    }

    submit(){
        if(this.state.name!=="" && this.state.url!==""){
            if((this.state.username!="" && this.state.password=="") || (this.state.username=="" && this.state.password!="")){
                this.setState({message:"Please fill both username and password or leave both empty"})
            }else{

                if(this.state.name.length >= 3){
                    // if(this.isUrlValid(JSON.stringify(this.state.url))){
                    
                        const obj = {
                            "name":this.state.name,
                            "link":this.state.url,
                            "userName":this.state.username, 
                            "password":this.state.password
                        }
                        this.props.addData(obj)
                    // }else{
                    //     this.setState({message:"Incorrect Url"})
                    // }
        
                }else{
                    this.setState({message:"Name field value too small"})
                }
            }
        }else{
            this.setState({message:"Please fill Name and Url fields"})
        }
    }

    onFocus(){
        
    }

    render() {
        return (
            <View style={styles.FormContainer}>
                <Text style={styles.Heading}>Add a website</Text>
                <View style={styles.Spacer}>
                    <Text style={styles.Label}>Name</Text>
                    <TextInput
                        onFocus={()=>this.setState({color1:"#38ACEC"})}
                        onBlur={()=>this.setState({color1:"white"})}
                        style={{borderBottomWidth:2, borderBottomColor:this.state.color1}}
                        placeholder="Enter name of website"
                        onChangeText={(text)=>this.setState({name:text})}
                    />
                </View>
                <View style={styles.Spacer}>
                    <Text style={styles.Label}>Url</Text>
                    <TextInput 
                        onFocus={()=>this.setState({color2:"#38ACEC"})}
                        onBlur={()=>this.setState({color2:"white"})}
                        style={{borderBottomWidth:2, borderBottomColor:this.state.color2}}
                        placeholder="Enter Url"
                        onChangeText={(text)=>this.setState({url:text})}
                    />
                </View>
                <View style={styles.Spacer}>
                    <Text style={styles.Label}>Username (optional)</Text>
                    <TextInput 
                        onFocus={()=>this.setState({color3:"#38ACEC"})}
                        onBlur={()=>this.setState({color3:"white"})}
                        style={{borderBottomWidth:2, borderBottomColor:this.state.color3}}
                        placeholder="Enter Username"
                        onChangeText={(text)=>this.setState({username:text})}
                    />
                </View>
                <View style={styles.Spacer,{marginBottom:20}}>
                    <Text style={styles.Label}>Password (optional)</Text>
                    <TextInput
                        onFocus={()=>this.setState({color4:"#38ACEC"})}
                        onBlur={()=>this.setState({color4:"white"})}
                        style={{borderBottomWidth:2, borderBottomColor:this.state.color4}} 
                        placeholder="Enter Password"
                        onChangeText={(text)=>this.setState({password:text})}
                        secureTextEntry={true}
                    />
                </View>
                <Button title="Submit" onPress={()=>this.submit()} />
                <Text style={styles.Error}>{this.state.message}</Text>
            </View>
            
        )
    }
}
const styles = StyleSheet.create({
    FormContainer:{
        padding:15
    },
    Heading:{
        fontSize:20,
        paddingBottom:10,
        fontWeight:"600",
        textAlign:"center",
        marginBottom:20,
        marginHorizontal:40,
        borderBottomWidth:3,
        borderBottomColor:"#38ACEC"
    },
    Spacer:{
        marginBottom:10
    },
    Label:{
        fontSize:18,
        fontWeight:"600"
    },
    Error:{
        paddingTop:15,
        color:"red",
        fontSize: 18,
        textAlign:"center"
    },
})