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
import { addNote, getNote } from "../../actions/AuthAction";

const Add = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [categoryUser, setCategoryUser] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleAlert = (message) => {
    setShowAlert(!showAlert);
    setAlertMessage(message);
  };

  const ubahStatus = (status) => {
    setStatus(status);
  };

  useEffect(() => {
    const fetchData = async () => {
      const notes = await getNote();
      const categories = notes.map((note) => note.category);
      const uniqueCategories = categories.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
      setCategoryUser(uniqueCategories);
    };

    const unsubscribe = navigation.addListener("focus", fetchData);

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  const onAddNote = async () => {
    if (title && content && status && category) {
      const data = {
        title: title,
        content: content,
        status: status,
        category: category,
      };

      console.log(data);
      try {
        const user = await addNote(data);
        navigation.replace("MainApp");
      } catch (error) {
        console.log("Error", error.message);
        toggleAlert(error.message);
      }
    } else {
      console.log("Error", "Data tidak lengkap");
      toggleAlert("Data tidak lengkap");
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      setCategoryUser((prevCategories) => [...prevCategories, newCategory]);
      setNewCategory("");
      setIsModalVisible(false);
    }
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
            <Input textarea={true} label="Content" width={"$full"} height={"$32"} onChangeText={(content) => setContent(content)} />
            <Pilihan label="Status" selectedValue={status} onValueChange={(status) => ubahStatus(status)} />
            <Pilihan label="Category" selectedValue={category} datas={categoryUser} onValueChange={(selectedCategory) => setCategory(selectedCategory)} />
            <Button type="text" title="Add New Category" onPress={toggleModal} padding={10} />
            <Button
              type="text"
              title="Save"
              padding={10}
              onPress={() => {
                onAddNote();
              }}
            />
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
                <InputField role="form" placeholder="Category Name" value={newCategory} onChangeText={(text) => setNewCategory(text)} />
              </GlueInput>
            </ModalBody>
            <ModalFooter>
              <Box flex={1} flexDirection="column" justifyContent="space-evenly">
                <Pressable
                  backgroundColor="$blue500"
                  p={"$2"}
                  borderRadius={"$sm"}
                  alignItems="center"
                  onPress={handleAddCategory} // Trigger category addition
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

        {/* show Alert */}
        {showAlert && (
          <Modal isOpen={showAlert} onClose={toggleAlert}>
            <ModalBackdrop />
            <Alert mx="$4" action="error" variant="solid">
              <AlertText fontWeight="$bold">Error!</AlertText>
              <AlertText>{alertMessage}</AlertText>
            </Alert>
          </Modal>
        )}
      </Box>
    </ScrollView>
  );
};

export default Add;
