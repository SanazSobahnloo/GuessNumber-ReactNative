import { View, Text, StyleSheet, Platform } from "react-native";
import React from "react";
import Colors from "../../constants/colors";
const Title = ({ children }) => {
	return <Text style={styles.title}>{children}</Text>;
};

export default Title;

const styles = StyleSheet.create({
	title: {
		fontFamily: "open-sans-bold",
		fontSize: 24,
		color: "white",
		textAlign: "center",
		borderWidth: Platform.OS === "android" ? 2 : 1,
		borderColor: "white",
		padding: Platform.select({ ios: 10, android: 12 }),
		maxWidth: "80%",
		width: 300,
	},
});
