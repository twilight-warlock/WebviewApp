/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import List from "./Components/List";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
global.Token = null;

/**
 * 
 * 
 * http://cstechno.dyndns.org
port 8080
username, password
123, 123
1234, !@#$
12345, 12345
 */

PushNotification.configure({
	onRegister: function ({ token }) {
		console.log(token);
		global.Token = token;
	},

	onRegistrationError: function (err) {
		console.log(err);
	},

	// (required) Called when a remote is received or opened, or local notification is opened
	onNotification: function (notification) {
		global.OpenFromNotification = true;
		global.URLToOpen = notification.data.URLToOpen;
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
				data: [],
			},
			title: 'Loading...',
			delConfirm: false,
			DataToBeDeleted: 0,
		};
	}

	componentDidMount() {
		this.getData();
	}

	updateUrl = (data) => {
		this.setState({
			currentUrl: data.link + `/login?user=${data.userName}&pass=${data.password}`
		});
	};

	updatePrimary = async (index) => {
		this.state.storage.primary = index;
		const currentData = this.state.storage.data[
			this.state.storage.primary
		];
		this.state.currentUrl = currentData.link + `/login?user=${currentData.userName}&pass=${currentData.password}`;
		this.setState({
			storage: this.state.storage,
			currentUrl: this.state.currentUrl,
		});
		this.storeData(this.state.storage);
	};

	storeData = async (value) => {
		try {
			const jsonValue = JSON.stringify(value);
			await AsyncStorage.setItem("storage", jsonValue);
		} catch (e) {
			console.log(e);
		}
	};

	getData = async () => {
		try {
			const storage = JSON.parse(await AsyncStorage.getItem("storage"));
			if (storage && storage.data && storage.data.length) {
				if (global.OpenFromNotification) {
					const obj = storage.data.find(
						(item) => item.link === global.URLToOpen
					);
					if (obj) {
						this.setState({
							storage: storage,
							currentUrl:
								obj.link +
								`/login?user=${obj.userName}&pass=${obj.password}`,
						});
						setTimeout(() => {
							this.setState({
								currentUrl: obj.link + "/Mobile_Alarms_Logged",
							});
						}, 3000);
						return;
					}
				}
				this.setState({
					storage: storage,
					currentUrl:
						storage.data[storage.primary].link +
						`/login?user=${storage.data[storage.primary].userName}&pass=${storage.data[storage.primary].password}`,
				});
			}
		} catch (e) {
			console.log(e);
		}
	};

	AddWebsite = async (obj) => {
		this.state.storage.data.push(obj);

		console.log({
			WebsiteURL: obj.link,
			Token: global.Token,
			UserName: obj.userName,
		});
		fetch("http://3.130.165.122/AddToken", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				WebsiteURL: obj.link,
				Token: global.Token,
				UserName: obj.userName,
			}),
		}).catch(console.log);

		this.state.currentUrl =
			this.state.storage.data[this.state.storage.primary].link +
			`/login?user=${this.state.storage.data[this.state.storage.primary].userName}&pass=${this.state.storage.data[this.state.storage.primary].password}`;

		this.setState({
			storage: this.state.storage,
			currentUrl: this.state.currentUrl,
		});

		this.storeData(this.state.storage);
	};

	confirmDel = () => {
		const { link, userName } = this.state.storage.data[
			this.state.DataToBeDeleted
		];

		fetch("http://3.130.165.122/DeleteToken", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: global.Token,
			},
			body: JSON.stringify({
				WebsiteURL: link,
				UserName: userName,
			}),
		}).catch(console.log);

		this.state.storage.data.splice(this.state.DataToBeDeleted, 1);
		this.state.delConfirm = false;

		if (this.state.storage.primary >= this.state.storage.data.length) {
			this.state.storage.primary = 0;
		}

		if (!this.state.storage.data.length) {
			this.state.currentUrl = null;
		} else {
			const currentData = this.state.storage.data[
				this.state.storage.primary
			];

			this.state.currentUrl = currentData.link + `/login?user=${currentData.userName}&pass=${currentData.password}`;

		}

		this.setState(this.state);
		this.storeData(this.state.storage);
	};

	delData = (index) => {
		this.setState({ delConfirm: false, DataToBeDeleted: index });
	};

	EditWebsite = (index, data) => {

		const { link, userName } = this.state.storage.data[index];

		fetch("http://3.130.165.122/DeleteToken", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: global.Token,
			},
			body: JSON.stringify({
				WebsiteURL: link,
				UserName: userName,
			}),
		}).catch(console.log);


		this.state.storage.data[index] = data;


		fetch("http://3.130.165.122/AddToken", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				WebsiteURL: data.link,
				Token: global.Token,
				UserName: data.userName,
			}),
		}).catch(console.log);

		this.state.currentUrl =
			this.state.storage.data[this.state.storage.primary].link +
			`/login?user=${this.state.storage.data[this.state.storage.primary].userName}&pass=${this.state.storage.data[this.state.storage.primary].password}`;

		this.setState({
			storage: this.state.storage,
			currentUrl: this.state.currentUrl,
		});

		this.storeData(this.state.storage);
	}

	handleTitleMessage = (Event) => {
		this.setState({ title: Event.nativeEvent.data })
	}

	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				{this.state.currentUrl ? (
					<>
						<View style={{
							backgroundColor: '#b8b9b4',
							height: 30,
							justifyContent: 'center',
							alignItems: 'center',
							marginBottom: 10
						}}>
							<Text style={{ color: 'white' }}>{this.state.title}</Text>
						</View>
						<WebView
							injectedJavaScript="window.window.ReactNativeWebView.postMessage(document.title)"
							onMessage={this.handleTitleMessage}
							source={{ uri: 'http://' + this.state.currentUrl }}
						/>
					</>
				) : (
					<View style={{ flex: 1, justifyContent: "center" }}>
						<Image
							source={require("./assets/logo1.png")}
							style={{
								width: 300,
								height: 300,
								alignSelf: "center",
								paddingBottom: 20,
							}}
						/>
						<Text style={styles.Welcome}>Welcome to EvoBM</Text>
						<Text style={styles.GetStarted}>
							Click on the button to get started
            				</Text>
					</View>
				)}
				<List
					update={this.updateUrl}
					storage={this.state.storage}
					updatePrimary={this.updatePrimary}
					AddWebsite={this.AddWebsite}
					confirmDel={this.confirmDel}
					delData={this.delData}
					EditWebsite={this.EditWebsite}
				/>
			</SafeAreaView>
		);
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
		borderRadius: 50,
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
		color: "#38ACEC",
	},
});

export default App;
