import React, { Component } from "react";
import { Box, Alert, FormControl, Text, Modal, ModalBackdrop, AlertText } from "@gluestack-ui/themed";
import { Input, Button } from "../../components";
import { registerUser } from "../../actions/AuthAction";

export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nama: "",
      nohp: "",
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

  onRegister = async () => {
    const { nama, email, nohp, password } = this.state;

    if (nama && email && nohp && password) {
      const data = {
        nama: nama,
        email: email,
        nohp: nohp,
        status: "user",
      };

      console.log(data);

      try {
        const user = await registerUser(data, password);
        this.props.navigation.replace("MainApp");
      } catch (error) {
        console.log("Error", error.message);
        this.toggleAlert(error.message);
      }
    } else {
      console.log("Error", "Data tidak lengkap");
      this.toggleAlert("Data tidak lengkap");
    }
  };
  render() {
    const { nama, email, nohp, password, showAlert, alertMessage } = this.state;
    return (
      <Box flex={1} backgroundColor="$blue400" justifyContent="center">
        <Box shadowColor="$black" shadowOffset={{ width: 0, height: 2 }} shadowOpacity={"$25"} shadowRadius={"$3.5"} elevation={"$5"} backgroundColor="$white" borderRadius={"$md"} marginTop={"$10"} marginHorizontal={"$6"} p={"$5"}>
          <Text size="3xl" color="$black">
            Welcome
          </Text>
          <Text size="sm" color="$black" my={"$1"}>
            Sign up to continue!
          </Text>
          <FormControl>
            <Input label="Nama" value={nama} onChangeText={(nama) => this.setState({ nama })} height={"$10"} />
            <Input label="Email" value={email} onChangeText={(email) => this.setState({ email })} height={"$10"} />
            <Input label="No. Handphone" keyboardType="phone-pad" value={nohp} onChangeText={(nohp) => this.setState({ nohp })} height={"$10"} />
            <Input label="Password" secureTextEntry value={password} onChangeText={(password) => this.setState({ password })} height={"$10"} />
          </FormControl>
          <Box flexDirection="column" my={"$5"}>
            <Button
              title="Register"
              type="text"
              icon="submit"
              padding={"$3"}
              fontSize={"$md"}
              onPress={() => {
                this.onRegister();
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

export default Register;
