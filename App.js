/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react'

import {View} from "react-native"

import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import List from "./Components/List"

const storageSchema = {
  primary:0,
  data:[
    {
      name:"Google",
      link:"www.google.com",
      userName:"abc",
      password:"def"
    },
    {
      name:"Facebook",
      link:"www.facebook.com",
      userName:"abc",
      password:"def"
    },
    {
        name:"Yahoo",
        link:"www.yahoo.com",
        userName:"abc",
        password:"def"
    },
    {
        name:"Stack OverFlow",
        link:"https://stackoverflow.com/",
        userName:"abc",
        password:"def"
    }
  ]
}




class App extends Component {
  constructor(props){
    super(props);

    this.state={
      currentUrl:"https://www.google.com/",
      storage: {
        primary:0,
        data:[
          {
            name:"Google",
            link:"www.google.com",
            userName:"abc",
            password:"def"
          },
        ]
      },
      delConfirm:false
    }
    this.updateUrl = this.updateUrl.bind(this)
    this.updatePrimary = this.updatePrimary.bind(this)
    this.storeData = this.storeData.bind(this)
    this.confirmDel = this.confirmDel.bind(this)
    this.delData = this.delData.bind(this)
  }

  componentDidMount(){
    this.storeData(storageSchema);
    this.getData()
  }

  updateUrl(url){
    this.setState({currentUrl:url})
  }
  updatePrimary = async(index) => {
    this.getData();
    let temp = this.state.storage;
    console.log(index);
    temp["primary"] = index;
    // console.log(temp);
    this.storeData(temp);
    this.setState({storage:temp})
    console.log(this.state);
  }

  storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      const value = await AsyncStorage.setItem('storage', jsonValue)
    } catch (e) {
      console.log(e);
    }
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('storage')
      if(value !== null) {
        // console.log(JSON.parse(value));
        this.setState({storage:JSON.parse(value)})
      }
    } catch(e) {
      console.log(e);
    }
  }
  
  getValue = async (obj) => {
    try {
      let value = await AsyncStorage.getItem('storage')
      if(value !== null) {
        let newdata = JSON.parse(value)["data"]
        newdata.push(obj)
        console.log(newdata);
        let newValue = JSON.parse(value);
        newValue["data"] = newdata;
        this.storeData(newValue)
        this.setState({storage:newValue})
      }
    } catch(e) {
      console.log(e);
    }
  }

  confirmDel(){
    this.setState({delConfirm:true});
    console.log(this.state.delConfirm);
  }

  delData(index){
    console.log(index);
    if(this.state.delConfirm){
        console.log("success");
        // this.delAndUpdate();
        this.setState({delConfirm:false})
    }
  }

  delAndUpdate = async (index) => {
    try {
      let value = await AsyncStorage.getItem('storage')
      if(value !== null) {
        let newdata = JSON.parse(value)["data"]
        newdata.splice(index,1)
        console.log(newdata);
        let newValue = JSON.parse(value);
        newValue["data"] = newdata;
        this.storeData(newValue)
        this.setState({storage:newValue})
      }
    } catch(e) {
      console.log(e);
    }
  }

  render() {
    return (
      <>
        <View style={{flex:1}}>
          <WebView source={{ uri: this.state.currentUrl }} />
          <List 
            update={this.updateUrl} 
            storage={this.state.storage} 
            updatePrimary={this.updatePrimary} 
            getValue={this.getValue} 
            confirmDel={this.confirmDel} 
            delData={this.delData} 
            
          />
        </View>
      </>
    )
  }
}

export default App;