import React, { Component } from 'react'
import { View, Text, StyleSheet } from "react-native"
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import List from "./Components/List";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
global.Token = null;


PushNotification.configure({
	
	onRegister: function ({token}) {
		global.Token = token;
		console.log(global.Token);
	},

	// (required) Called when a remote is received or opened, or local notification is opened
	onNotification: function (notification) {
		notification.finish(PushNotificationIOS.FetchResult.NoData);
	},
});

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentUrl: null,
			storage: {
				primary: 0,
				data: []
			},
			delConfirm: false,
			DataToBeDeleted: 0,
		}
	}

	componentDidMount() {
		this.getData();
	}

	updateUrl = (url) => {
		this.setState({ currentUrl: url })
	}

	updatePrimary = async (index) => {
		this.state.storage.primary = index;
		this.state.currentUrl = this.state.storage.data[this.state.storage.primary].link;
		this.setState({ storage: this.state.storage, currentUrl: this.state.currentUrl });
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
			const storage = JSON.parse(await AsyncStorage.getItem('storage'));
			if (storage && storage.data && storage.data.length) {
				this.setState({ storage: storage, currentUrl: storage.data[storage.primary].link + `/login?user=${encodeURI(storage.data[storage.primary].userName)}&pass=${encodeURI(storage.data[storage.primary].password)}` })
			}
		} catch (e) {
			console.log(e);
		}
	}

	AddWebsite = async (obj) => {

		this.state.storage.data.push(obj);

		fetch('http://3.130.165.122/AddToken', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				WebsiteURL: obj.link,
				Token: global.Token,
				UserName: obj.userName
			})
		}).catch(console.log);

		this.state.currentUrl = this.state.storage.data[this.state.storage.primary].link + `/login?user=${encodeURI(this.state.storage.data[this.state.storage.primary].userName)}&pass=${encodeURI(this.state.storage.data[this.state.storage.primary].password)}`;

		this.setState({ storage: this.state.storage, currentUrl: this.state.currentUrl });

		this.storeData(this.state.storage);
	}

	confirmDel = () => {

		const {link, userName} = this.state.storage.data[this.state.DataToBeDeleted];

		fetch('http://3.130.165.122/DeleteToken', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				authorization: global.Token
			},
			body: JSON.stringify({
				WebsiteURL: link,
				UserName: userName
			})
		}).catch(console.log);

		this.state.storage.data.splice(this.state.DataToBeDeleted, 1);
		this.state.delConfirm = false;

		if (this.state.storage.primary >= this.state.storage.data.length) {
			this.state.storage.primary = 0;
		}

		if (!this.state.storage.data.length) {
			this.state.currentUrl = null;
		} else {
			this.state.currentUrl = this.state.storage.data[this.state.storage.primary].link;
		}

		this.setState(this.state);
		this.storeData(this.state.storage);
	}

	delData = (index) => {
		this.setState({ delConfirm: false, DataToBeDeleted: index });
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				{this.state.currentUrl ?
					<WebView source={{ uri: this.state.currentUrl }} />
					:
					<View style={{ flex: 1, justifyContent: "center" }}>
						<Text style={styles.Welcome}>
							Welcome to Alarmy
							</Text>
						<Text style={styles.GetStarted}>
							Click on the button to get started
							</Text>
					</View>
				}
				<List
					update={this.updateUrl}
					storage={this.state.storage}
					updatePrimary={this.updatePrimary}
					AddWebsite={this.AddWebsite}
					confirmDel={this.confirmDel}
					delData={this.delData}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	GetStarted: {
		fontSize: 16,
		padding: 10,
		fontWeight: "900",
		textAlign: "center",
		marginBottom: 30,
		marginHorizontal: 40,
		color: "#38ACEC",
		borderRadius: 50
	},
	Welcome: {
		fontSize: 27,
		marginTop: 40,
		padding: 10,
		fontWeight: "900",
		textAlign: "center",
		borderBottomWidth: 3,
		borderBottomColor: "#ddd",
		marginHorizontal: 60,
		color: "#38ACEC"
	}
})

export default App;