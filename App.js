import React, { Component } from 'react'
import { View, Text } from "react-native"
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
				this.setState({ storage: storage, currentUrl: storage.data[storage.primary].link })
			}
		} catch (e) {
			console.log(e);
		}
	}

	AddWebsite = async (obj) => {

		this.state.storage.data.push(obj);

		this.state.currentUrl = this.state.storage.data[this.state.storage.primary].link;

		this.setState({ storage: this.state.storage, currentUrl: this.state.currentUrl });

		this.storeData(this.state.storage);
	}

	confirmDel = () => {
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
			<>
				<View style={{ flex: 1 }}>
					{this.state.currentUrl ?
						<WebView source={{ uri: this.state.currentUrl }} />
						:
						<View style={{ flex: 1, justifyContent: "center" }}>
							<Text style={{
								fontSize: 27,
								marginTop: 40,
								padding: 10,
								fontWeight: "900",
								textAlign: "center",
								borderBottomWidth: 3,
								borderBottomColor: "#ddd",
								marginHorizontal: 60,
								color: "#38ACEC"
							}}
							>
								Welcome to Alarmy
							</Text>
							<Text style={{
								fontSize: 16,
								padding: 10,
								fontWeight: "900",
								textAlign: "center",
								marginBottom: 30,
								marginHorizontal: 40,
								color: "#38ACEC",
								borderRadius: 50
							}}
							>
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
			</>
		)
	}
}

export default App;