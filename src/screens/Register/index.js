import React, { useState } from "react";
import {
  Box,
  Alert,
  FormControl,
  Text,
  Modal,
  ModalBackdrop,
  AlertText,
} from "@gluestack-ui/themed";
import { Input, Button } from "../../components";
import BackFAB from "../../components/kecil/back_fab";

const Register = ({ navigation }) => {
  return (
    <Box flex={1} backgroundColor="$blue400" justifyContent="center">
      <BackFAB />
      <Box
        shadowColor="$black"
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={"$25"}
        shadowRadius={"$3.5"}
        elevation={"$5"}
        backgroundColor="$white"
        borderRadius={"$md"}
        marginTop={"$10"}
        marginHorizontal={"$6"}
        p={"$5"}
      >
        <Text size="3xl" color="$black" fontWeight="bold">
          Hello~
        </Text>
        <Text size="sm" color="$black" my={"$1"}>
          Sign up to continue!
        </Text>
        <FormControl>
          <Input
            label="Nama"
            value={null}
            onChangeText={() => {}}
            height={"$10"}
          />
          <Input
            label="Email"
            value={null}
            onChangeText={() => {}}
            height={"$10"}
          />
          <Input
            label="No. Handphone"
            keyboardType="phone-pad"
            value={null}
            onChangeText={() => {}}
            height={"$10"}
          />
          <Input
            label="Password"
            secureTextEntry
            value={null}
            onChangeText={() => {}}
            height={"$10"}
          />
        </FormControl>
        <Box flexDirection="column" my={"$5"}>
          <Button
            title="Register"
            type="text"
            icon="submit"
            padding={"$3"}
            fontSize={"$md"}
            onPress={() => {
              navigation.navigate("Login");
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
