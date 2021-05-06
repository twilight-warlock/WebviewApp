import React, { Component } from 'react'
import { TextInput, View, Text, Button, StyleSheet } from "react-native"

export default class Add extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.data?.name ? this.props.data?.name : "",
			username: this.props.data?.userName ? this.HexToString(this.props.data?.userName) : "",
			password: "",
			url: this.props.data?.link ? this.props.data?.link.split(":")[0] : "",
			port: this.props.data?.link ? this.props.data?.link.split(":")[1] : "",
			message: "",
			color1: "#eee",
			color2: "#eee",
			color3: "#eee",
			color4: "#eee",
			color5: "#eee",
		}
	}

	toHex = (string) => {
		let result = "";
		for (var i = 0; i < string.length; i++) {
			result += '%' + (string.charCodeAt(i).toString(16));
		}
		return result;
	}

	HexToString = (string) => {
		if(string) {
			let hex  = string.toString().replace(/\%/g, '');
			let str = '';
			for (let n = 0; n < hex.length; n += 2) {
				str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
			}
			return str;
		}
		return "";
	}

	isUrlValid = (userInput) => /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi.test(userInput);

	submit = () => {
		if (this.state.name && this.state.url && this.state.username && this.state.password) {
			if (this.state.name.length >= 3) {
				if (this.isUrlValid(this.state.url)) {
					
					this.state.url = this.state.url.replace(new RegExp("^(http[s]?://www\\.|http[s]?://|www\\.)"), "");
					const obj = {
						name: this.state.name,
						link: this.state.url + ':' + this.state.port,
						userName: this.toHex(this.state.username),
						password: this.toHex(this.state.password)
					}

					let NewData = true;
					if(this.props.data?.name) {
						NewData = false;
					}

					this.props.addData(obj, NewData)
				} else {
					this.setState({ message: "Incorrect Url" })
				}

			} else {
				this.setState({ message: "Name field value too small" })
			}
		} else {
			this.setState({ message: "Please fill all the fields" })
		}
	}

	render() {
		return (
			<View style={styles.FormContainer}>
				{this.props.data ?
					<Text style={styles.Heading}>Edit an EVO System</Text>
					:
					<Text style={styles.Heading}>Add an EVO System</Text>
				}
				<View style={styles.Spacer}>
					<Text style={styles.Label}>Name</Text>
					<TextInput
						value={this.state.name}
						onFocus={() => this.setState({ color1: "#38ACEC" })}
						onBlur={() => this.setState({ color1: "white" })}
						style={{ borderBottomWidth: 2, borderBottomColor: this.state.color1 }}
						placeholder="Enter Name of a Site"
						onChangeText={(text) => this.setState({ name: text })}
					/>
				</View>
				<View style={styles.Spacer}>
					<Text style={styles.Label}>Url</Text>
					<TextInput
						value={this.state.url}
						onFocus={() => this.setState({ color2: "#38ACEC" })}
						onBlur={() => this.setState({ color2: "white" })}
						style={{ borderBottomWidth: 2, borderBottomColor: this.state.color2 }}
						placeholder="Enter Url"
						onChangeText={(text) => this.setState({ url: text })}
					/>
				</View>
				<View style={styles.Spacer}>
					<Text style={styles.Label}>Port</Text>
					<TextInput
						value={this.state.port}
						onFocus={() => this.setState({ color3: "#38ACEC" })}
						onBlur={() => this.setState({ color3: "white" })}
						style={{ borderBottomWidth: 2, borderBottomColor: this.state.color3 }}
						placeholder="Enter Port"
						onChangeText={(text) => this.setState({ port: text })}
					/>
				</View>
				<View style={styles.Spacer}>
					<Text style={styles.Label}>Username</Text>
					<TextInput
						value={this.state.username}
						onFocus={() => this.setState({ color4: "#38ACEC" })}
						onBlur={() => this.setState({ color4: "white" })}
						style={{ borderBottomWidth: 2, borderBottomColor: this.state.color4 }}
						placeholder="Enter Username"
						onChangeText={(text) => this.setState({ username: text })}
					/>
				</View>
				<View style={{...styles.Spacer, marginBottom: 20 }}>
					<Text style={styles.Label}>Password</Text>
					<TextInput
						value={this.state.password}
						onFocus={() => this.setState({ color5: "#38ACEC" })}
						onBlur={() => this.setState({ color5: "white" })}
						style={{ borderBottomWidth: 2, borderBottomColor: this.state.color5 }}
						placeholder="Enter Password"
						onChangeText={(text) => this.setState({ password: text })}
						secureTextEntry={true}
					/>
				</View>
				<Button title="Submit" onPress={this.submit} />
				<Text style={styles.Error}>{this.state.message}</Text>
			</View>

		)
	}
}
const styles = StyleSheet.create({
	FormContainer: {
		padding: 15
	},
	Heading: {
		fontSize: 20,
		paddingBottom: 10,
		fontWeight: "600",
		textAlign: "center",
		marginBottom: 20,
		marginHorizontal: 40,
		borderBottomWidth: 3,
		borderBottomColor: "#38ACEC"
	},
	Spacer: {
		marginBottom: 10
	},
	Label: {
		fontSize: 18,
		fontWeight: "600"
	},
	Error: {
		paddingTop: 15,
		color: "red",
		fontSize: 18,
		textAlign: "center"
	},
})