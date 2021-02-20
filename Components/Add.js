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
        }
    }

    isUrlValid(userInput) {
        var regexQuery = "/(http(s)?://.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/";
        var url = new RegExp(regexQuery,"g");
        if (url.test(userInput)) {
            return true;
        }
        return false;
    }

    submit(){
        if(this.state.name!=="" && this.state.username!=="" && this.state.password!=="" && this.state.url!==""){
            if(this.state.name.length >= 3){
                // if(this.isUrlValid(this.state.url)){
                
                const obj = {
                    "name":this.state.name,
                    "link":this.state.url,
                    "userName":this.state.username, 
                    "password":this.state.password
                }
                console.log(obj)
                this.getData(obj)
                // }else{
                //     this.setState({message:"Incorrect Url"})
                // }
    
            }else{
                this.setState({message:"Name field value too small"})
            }
        }else{
            this.setState({message:"Please fill all fields"})
        }
    }

    getData = async (obj) => {
        try {
          const value = await AsyncStorage.getItem('storage')
          if(value !== null) {
            let data = JSON.parse(value)["data"]
            data.push(obj)
            this.props.storeData(data)
            console.log("voila");
          }
        } catch(e) {
          console.log(e);
        }
      }

    render() {
        return (
            <View style={styles.FormContainer}>
                <View>
                    <Text>Name</Text>
                    <TextInput 
                        placeholder="Name"
                        onChangeText={(text)=>this.setState({name:text})}
                    />
                </View>
                <View>
                    <Text>Url</Text>
                    <TextInput 
                        placeholder="Url"
                        onChangeText={(text)=>this.setState({url:text})}
                    />
                </View>
                <View>
                    <Text>Username</Text>
                    <TextInput 
                        placeholder="Username"
                        onChangeText={(text)=>this.setState({username:text})}
                    />
                </View>
                <View>
                    <Text>Password</Text>
                    <TextInput 
                        placeholder="Password"
                        onChangeText={(text)=>this.setState({password:text})}
                        secureTextEntry={true}
                    />
                </View>
                <Button title="Submit" onPress={()=>this.submit()} />
                <Text>{this.state.message}</Text>
            </View>
            
        )
    }
}
const styles = StyleSheet.create({
    FormContainer:{
        padding:15
    }
})