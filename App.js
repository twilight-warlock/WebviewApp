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
import Form from "./Components/Form"

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
      }
    }
    this.updateUrl = this.updateUrl.bind(this)
  }

  componentDidMount(){
    this.storeData(storageSchema);
    this.getData()
  }

  updateUrl(url){
    this.setState({currentUrl:url})
  }

  storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('storage', jsonValue)
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
  

  render() {
    return (
      <>
        <View style={{flex:1}}>
          <WebView source={{ uri: this.state.currentUrl }} />
          <Form update={this.updateUrl} storage={this.state.storage}></Form>
        </View>
      </>
    )
  }
}

export default App;