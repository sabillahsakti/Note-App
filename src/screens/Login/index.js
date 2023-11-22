import React, { Component } from "react";
import { Alert, Box, Text, FormControl, VStack, HStack, Heading, AlertText, Modal, ModalBackdrop } from "@gluestack-ui/themed";
import { Input, Button } from "../../components";
import { loginUser } from "../../actions/AuthAction";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",

      //Alert handling
      showAlert: false,
      alertMessage: "",
    };
  }

  toggleAlert = (message) => {
    this.setState({ showAlert: !this.state.showAlert, alertMessage: message });
  };

  login = () => {
    const { email, password } = this.state;

    if (email && password) {
      loginUser(email, password)
        .then((user) => {
          // Pengguna berhasil login, lakukan sesuatu dengan data pengguna jika perlu
          this.props.navigation.replace("MainApp");
        })
        .catch((error) => {
          // Terjadi kesalahan saat login, tampilkan pesan kesalahan
          console.log("Error", error.message);
          this.toggleAlert(error.message);
        });
    }
  };
  render() {
    const { email, password, showAlert, alertMessage } = this.state;
    return (
      <Box flex={1} backgroundColor="$blue400" justifyContent="center">
        <Box shadowColor="$black" shadowOffset={{ width: 0, height: 2 }} shadowOpacity={"$25"} shadowRadius={"$3.5"} elevation={"$5"} backgroundColor="$white" borderRadius={"$md"} marginTop={"$10"} marginHorizontal={"$6"} p={"$5"}>
          <Heading size="3xl" color="$black">
            Welcome
          </Heading>
          <Text size="sm" color="$black" my={"$1"}>
            Sign in to continue!
          </Text>
          <FormControl>
            <Input
              label={"Login"}
              width={"$full"}
              height={"$10"}
              onChangeText={(text) => this.setState({ email: text })} // Set email ke dalam state
              value={email}
            />
            <Input
              label="Password"
              width={"$full"}
              height={"$10"}
              secureTextEntry={true}
              onChangeText={(text) => this.setState({ password: text })} // Set password ke dalam state
              value={password}
            />
          </FormControl>
          <Box flexDirection="column" my={"$5"}>
            <Button title="Login" type="text" padding={"$3"} onPress={() => this.login()} />
            <Text size="sm" color="$black" mt={"$4"}>
              Don't have an account?
            </Text>
            <Button
              title="Register"
              type="text"
              padding={"$3"}
              onPress={() => {
                this.props.navigation.navigate("Register");
              }}
            />
          </Box>
        </Box>

        {/* show Alert */}
        {showAlert && (
          <Modal isOpen={showAlert} onClose={this.toggleAlert}>
            <ModalBackdrop />
            <Alert mx="$4" action="error" variant="solid">
                <AlertText fontWeight="$bold">Error!</AlertText>
                <AlertText>{alertMessage}</AlertText>
            </Alert>
          </Modal>
        )}
      </Box>
    );
  }
}

export default Login;
