import React, { useState, useEffect } from "react";
import { Alert, Box, Heading, Text, FormControl, Modal, ModalBackdrop, AlertText, Fab, FabLabel, FabIcon, ArrowLeftIcon, ScrollView } from "@gluestack-ui/themed";
import { Button, Input, Pilihan } from "../../components";
import BackFAB from "../../components/kecil/back_fab";

const EditNote = ({ route, navigation }) => {
  return (
    <Box flex={1} backgroundColor="$white" justifyContent="center">
      <BackFAB />
      <Box shadowColor="$black" shadowOffset={{ width: 0, height: 2 }} shadowOpacity={"$25"} shadowRadius={"$3.5"} elevation={"$5"} backgroundColor="$white" borderRadius={"$md"} mt={"$8"} mx={"$3"} px={"$3"} pt={"$2"}>
        <Heading size="2xl" color="$black">
          Edit Your Task!
        </Heading>
        <Text size="sm" color="$black" my={"$1"}>
          Having a mistake? An edit got you covered!
        </Text>
        <FormControl>
          <Input label={"Title"} width={"$full"} height={"$10"} value={null} onChangeText={() => {}} />
          <Input textarea={true} label="Content" width={"$full"} height={"$32"} value={null} onChangeText={() => {}} />
          <Pilihan label="Status" value={null} selectedValue={null} onValueChange={() => {}} />
          <Pilihan label="Category" selectedValue={null} datas={null} onValueChange={() => {}} />
          <Button
            type="text"
            title="Update"
            padding={10}
            onPress={() => {
              onEditNote();
            }}
          />
        </FormControl>
      </Box>
    </Box>
  );
};

export default EditNote;
