import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";

const generateRandomBetween = (min, max, exclude) => {
	const rndNum = Math.floor(Math.random() * (max - min)) + min;
	if (rndNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return rndNum;
	}
};

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, onGameOver }) => {
	const initialGuess = generateRandomBetween(
		minBoundary,
		maxBoundary,
		userNumber
	);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	useEffect(() => {
		if (currentGuess === userNumber) {
			onGameOver();
		}
	}, [currentGuess, userNumber, onGameOver]);
	const nextGuessHandler = (direction) => {
		if (
			(direction === "lower" && currentGuess < userNumber) ||
			(direction === "greater" && currentGuess > userNumber)
		) {
			Alert.alert("Don't lie!", "You know that this is wrong...", [
				{ text: "Sorry!", style: "cancel" },
			]);
			return;
		}
		if (direction === "lower") {
			maxBoundary = currentGuess;
		} else {
			minBoundary = currentGuess + 1;
		}
		console.log(minBoundary, maxBoundary);
		const newRndNumber = generateRandomBetween(
			minBoundary,
			maxBoundary,
			currentGuess
		);
		setCurrentGuess(newRndNumber);
	};
	return (
		<View style={styles.screen}>
			<Title>Opponent's Guest</Title>
			<NumberContainer>{currentGuess}</NumberContainer>
			<View>
				<Text>Higher or lower?</Text>
				<View>
					<PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
						-
					</PrimaryButton>
					<PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
						+
					</PrimaryButton>
				</View>
			</View>
			<View>{/* LOG ROUNDS */}</View>
		</View>
	);
};

export default GameScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 40,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: Colors.accent500,
		textAlign: "center",
		borderWidth: 2,
		borderColor: Colors.accent500,
		padding: 12,
	},
});
