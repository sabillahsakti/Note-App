import { StyleSheet, View } from "react-native";
import React, { Component } from "react";
import { IconLogo } from "../../assets";

export default class Splash extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Login');
    }, 3000)
  }

  render() {
    return (
      <View style={styles.pages}>
        <IconLogo />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
