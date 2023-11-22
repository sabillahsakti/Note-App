import React, { Component } from "react";
import { Box, Text, Image, VStack } from "@gluestack-ui/themed";
import { Button } from "../../components";
import { clearStorage, getData } from "../../utils";
import FIREBASE from "../../config/FIREBASE";

export class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: false,
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this.getUserData();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  getUserData = () => {
    getData("user").then((res) => {
      const data = res;
      if (data) {
        console.log("isi data", data);
        this.setState({
          profile: data,
        });
      } else {
        // this.props.navigation.replace('Login')
      }
    });
  };
  onSubmit = (profile) => {
    if (profile) {
      FIREBASE.auth()
        .signOut()
        .then(() => {
          // Sign-out successful.
          clearStorage();
          this.props.navigation.replace("MainApp");
        })
        .catch((error) => {
          // An error happened.
          alert(error);
        });
    } else {
      this.props.navigation.replace("Login");
    }
  };
  render() {
    const { profile } = this.state;
    return (
      <Box mt={"$5"} mx={"$5"} backgroundColor="$blueGray100" flex={1} marginTop={"$20"} flexDirection="column">
        <VStack backgroundColor="$blueGray100" width={"$full"} mb={"$10"}>
          <Image source={require("../../assets/images/avatar.png")} size="2xl" borderRadius={"$full"} alignSelf="center" alt="Foto Profil" />
          <Text fontSize={"$xl"} alignSelf="center" marginTop={"$5"} fontWeight="$bold">
            {profile.nama}
          </Text>
        </VStack>
        <Box flexDirection="column" bgColor="$white" shadowColor="$black" shadowOffset={{ width: 0, height: 2 }} shadowOpacity={"$25"} shadowRadius={"$3.5"} justifyContent="space-evenly" p={"$5"} borderRadius={"$xl"}>
          <Text color="$black" fontWeight="$bold" fontSize={"$xl"}>
            Data Diri
          </Text>
          <Box mt={"$5"}>
            <Text color="$black" fontSize={"$sm"}>
              Email
            </Text>
            <Text color="$black" fontSize={"$xl"} mt={"$2"}>
              {profile.email}
            </Text>
          </Box>
          <Box mt={"$5"}>
            <Text color="$black" fontSize={"$sm"}>
              Nomor Ponsel
            </Text>
            <Text color="$black" fontSize={"$xl"} mt={"$2"}>
              {profile.nohp}
            </Text>
          </Box>
        </Box>
        <Button type="text" title={profile ? "Logout" : "Login"} padding={"$3"} onPress={() => this.onSubmit(profile)} />
      </Box>
    );
  }
}

export default Profile;
