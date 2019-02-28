import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import { addCardToDeck } from "../Utils/Api.js";
import { connect } from "react-redux";
import { addCard } from "../Actions/index.js";
import SubmitButton from "../Components/SubmitButton.js";
import { NavigationActions } from "react-navigation";

class AddCard extends React.Component {
  state = {
    question: "",
    answer: ""
  };

  submitCard = deck => {
    const { question, answer } = this.state;

    if (question && answer) {
      this.props.dispatch(addCard({ question, answer, deck }));
      addCardToDeck(deck, { question, answer });
      this.setState({ question: "", answer: "" });
      this.props.navigation.dispatch(NavigationActions.back({ key: null }));
    }
  };

  render() {
    const deckName = this.props.navigation.state.params.entryId;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.title}>Question: </Text>
          <TextInput
            style={styles.input}
            onChangeText={question => this.setState({ question })}
            value={this.state.question}
          />
          <Text style={styles.title}>Answer: </Text>
          <TextInput
            style={styles.input}
            onChangeText={answer => this.setState({ answer })}
            value={this.state.answer}
          />
          <SubmitButton
            styles={styles}
            onPress={() => this.submitCard(deckName)}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  submitBtnText: {
    color: "white",
    fontSize: 22,
    textAlign: "center"
  },
  title: {
    fontSize: 30,
    color: "#333"
  },
  submitBtn: {
    borderWidth: 0.5,
    padding: 10,
    backgroundColor: "orange",
    borderRadius: 7,
    overflow: "hidden"
  },
  input: {
    width: 250,
    height: 40,
    padding: 8,
    borderWidth: 1,
    borderColor: "#757575",
    margin: 20,
    borderRadius: 7
  }
});

export default connect()(AddCard);