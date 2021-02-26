import React, { Component } from 'react'
import { TextInput, View, Text, Button, StyleSheet } from "react-native"

export default class Add extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			username: "",
			password: "",
			url: "http://",
			port: '80',
			message: "",
			color1: "#eee",
			color2: "#eee",
			color3: "#eee",
			color4: "#eee",
		}
	}

	isUrlValid = (userInput) => /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi.test(userInput);

	submit() {
		if (this.state.name && this.state.url && this.state.username && this.state.password) {
			if (this.state.name.length >= 3) {
				if (this.isUrlValid(this.state.url)) {

					const obj = {
						"name": this.state.name,
						"link": this.state.url + ':' + this.state.port,
						"userName": this.state.username,
						"password": this.state.password
					}

					this.props.addData(obj)
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
				<Text style={styles.Heading}>Add a website</Text>
				<View style={styles.Spacer}>
					<Text style={styles.Label}>Name</Text>
					<TextInput
						onFocus={() => this.setState({ color1: "#38ACEC" })}
						onBlur={() => this.setState({ color1: "white" })}
						style={{ borderBottomWidth: 2, borderBottomColor: this.state.color1 }}
						placeholder="Enter name of website"
						onChangeText={(text) => this.setState({ name: text })}
					/>
				</View>
				<View style={styles.Spacer}>
					<Text style={styles.Label}>Url</Text>
					<TextInput
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
						onFocus={() => this.setState({ color2: "#38ACEC" })}
						onBlur={() => this.setState({ color2: "white" })}
						style={{ borderBottomWidth: 2, borderBottomColor: this.state.color2 }}
						placeholder="Enter Port"
						onChangeText={(text) => this.setState({ port: text })}
					/>
				</View>
				<View style={styles.Spacer}>
					<Text style={styles.Label}>Username</Text>
					<TextInput
						onFocus={() => this.setState({ color3: "#38ACEC" })}
						onBlur={() => this.setState({ color3: "white" })}
						style={{ borderBottomWidth: 2, borderBottomColor: this.state.color3 }}
						placeholder="Enter Username"
						onChangeText={(text) => this.setState({ username: text })}
					/>
				</View>
				<View style={{...styles.Spacer, marginBottom: 20 }}>
					<Text style={styles.Label}>Password</Text>
					<TextInput
						onFocus={() => this.setState({ color4: "#38ACEC" })}
						onBlur={() => this.setState({ color4: "white" })}
						style={{ borderBottomWidth: 2, borderBottomColor: this.state.color4 }}
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