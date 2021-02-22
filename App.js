import React, { Component } from 'react'
import { View } from "react-native"
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import List from "./Components/List"

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentUrl: null,
			storage: {
				primary: 0,
				data: []
			},
			delConfirm: false
		}
	}

	componentDidMount() {
		this.getData();
	}

	updateUrl(url) {
		this.setState({ currentUrl: url })
	}

	updatePrimary = async (index) => {
		this.getData();
		let temp = this.state.storage;
		console.log(index);
		temp["primary"] = index;
		// console.log(temp);
		this.storeData(temp);
		this.setState({ storage: temp })
		console.log(this.state);
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
			if (value !== null) {
				this.setState({ storage: JSON.parse(value) })
			}
		} catch (e) {
			console.log(e);
		}
	}

	getValue = async (obj) => {
		try {
			let value = await AsyncStorage.getItem('storage')
			if (value !== null) {
				let newdata = JSON.parse(value)["data"]
				newdata.push(obj)
				console.log(newdata);
				let newValue = JSON.parse(value);
				newValue["data"] = newdata;
				this.storeData(newValue)
				this.setState({ storage: newValue })
			}
		} catch (e) {
			console.log(e);
		}
	}

	confirmDel = () => {
		this.setState({ delConfirm: true });
		console.log(this.state.delConfirm);
	}

	delData = (index) => {
		if (this.state.delConfirm) {
			console.log("success");
			// this.delAndUpdate();
			this.setState({ delConfirm: false })
		}
	}

	delAndUpdate = async (index) => {
		try {
			let value = await AsyncStorage.getItem('storage')
			if (value !== null) {
				let newdata = JSON.parse(value)["data"]
				newdata.splice(index, 1)
				console.log(newdata);
				let newValue = JSON.parse(value);
				newValue["data"] = newdata;
				this.storeData(newValue)
				this.setState({ storage: newValue })
			}
		} catch (e) {
			console.log(e);
		}
	}

	render() {
		return (
			<>
				<View style={{ flex: 1 }}>
					{this.state.currentUrl ?
						<WebView source={{ uri: this.state.currentUrl }} />
						:
						<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
							
						</View>
					}
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