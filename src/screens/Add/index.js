import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  HStack,
  VStack,
  Modal,
  ModalBackdrop,
  ModalBody,
  FormControlLabel,
  Text,
  InputField,
  Input as GlueInput,
  Pressable,
  Heading,
  ModalHeader,
  ModalContent,
  ModalFooter,
  Alert,
  AlertIcon,
  AlertText,
  Center,
  ScrollView,
} from "@gluestack-ui/themed";
import { Button, Input, Pilihan } from "../../components";

const Add = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <ScrollView>
      <Box flex={1} backgroundColor="$white">
        <Box shadowColor="$black" shadowOffset={{ width: 0, height: 2 }} shadowOpacity={"$25"} shadowRadius={"$3.5"} elevation={"$5"} backgroundColor="$white" borderRadius={"$md"} mt={"$8"} mx={"$3"} px={"$3"} pt={"$2"}>
          <Heading size="2xl" color="$black">
            Add New Task!
          </Heading>
          <Text size="sm" color="$black" my={"$1"}>
            Add your new task here!
          </Text>
          <FormControl>
            <Input label={"Title"} width={"$full"} height={"$10"} onChangeText={(title) => setTitle(title)} />
            <Input textarea={true} label="Content" width={"$full"} height={"$32"} onChangeText={() => {}} />
            <Pilihan label="Status" />
            <Pilihan label="Category" />
            <Button type="text" title="Add New Category" onPress={toggleModal} padding={10} />
            <Button type="text" title="Save" padding={10} onPress={() => {}} />
          </FormControl>
        </Box>

        <Modal isOpen={isModalVisible} onClose={toggleModal} finalFocusRef={this.btnRef}>
          <ModalBackdrop />
          <ModalContent backgroundColor="$white" padding={"$2"} borderRadius={"$lg"}>
            <ModalHeader>
              <VStack space="sm">
                <Heading size="lg">Add New Category</Heading>
                <Text size="sm">Having a lot of task must be needing categories too!</Text>
              </VStack>
            </ModalHeader>
            <ModalBody>
              <GlueInput>
                <InputField role="form" placeholder="Category Name" value={null} onChangeText={() => {}} />
              </GlueInput>
            </ModalBody>
            <ModalFooter>
              <Box flex={1} flexDirection="column" justifyContent="space-evenly">
                <Pressable
                  backgroundColor="$blue500"
                  p={"$2"}
                  borderRadius={"$sm"}
                  alignItems="center"
                  onPress={() => {}} // Trigger category addition
                >
                  <Text color="$white" fontWeight="$bold">
                    Add
                  </Text>
                </Pressable>

                <Pressable
                  backgroundColor="$red700"
                  p={"$2"}
                  mt={"$2"}
                  borderRadius={"$sm"}
                  alignItems="center"
                  onPress={toggleModal} // Close modal
                >
                  <Text color="$white" fontWeight="$bold">
                    Cancel
                  </Text>
                </Pressable>
              </Box>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </ScrollView>
  );
};

export default Add;
