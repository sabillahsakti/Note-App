import React, { Component } from "react";
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
} from "@gluestack-ui/themed";
import { Button, Input, Pilihan } from "../../components";
import { addNote, getNote } from "../../actions/AuthAction";

export class Add extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      content: "",
      status: "",
      caregory: "",
      categoryUser: [],

      //Buat Modal
      isModalVisible: false,
      newCategory: "",

      //Alert handling
      showAlert: false,
      alertMessage: "",
    };
  }

  // Fungsi untuk menampilkan atau menyembunyikan modal
  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  toggleAlert = (message) => {
    this.setState({ showAlert: !this.state.showAlert, alertMessage: message });
  };

  ubahStatus = (status) => {
    this.setState({
      status: status,
    });
  };

  async componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("focus", async () => {
      const notes = await getNote();
      const categories = notes.map((note) => note.category);
      const uniqueCategories = categories.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
      this.setState({ categoryUser: uniqueCategories });
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  onAddNote = async () => {
    const { title, content, status, category } = this.state;
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

  handleAddCategory = () => {
    const { newCategory, categoryUser } = this.state;
    if (newCategory.trim() !== "") {
      this.setState((prevState) => ({
        categoryUser: [...prevState.categoryUser, newCategory],
        newCategory: "", // Reset newCategory after adding
        isModalVisible: false, // Close modal after adding category
      }));
    }
  };

  render() {
    const { title, content, status, category, categoryUser } = this.state;
    const { isModalVisible, newCategory, showAlert, alertMessage } = this.state;
    console.log("Isi Category", categoryUser);

    return (
      <Box flex={1} backgroundColor="$white">
        <Box shadowColor="$black" shadowOffset={{ width: 0, height: 2 }} shadowOpacity={"$25"} shadowRadius={"$3.5"} elevation={"$5"} backgroundColor="$white" borderRadius={"$md"} mt={"$8"} mx={"$3"} px={"$3"} pt={"$2"}>
          <Heading size="2xl" color="$black">
            Add New Task!
          </Heading>
          <Text size="sm" color="$black" my={"$1"}>
            Add your new task here!
          </Text>
          <FormControl>
            <Input label={"Title"} width={"$full"} height={"$10"} onChangeText={(title) => this.setState({ title })} />
            <Input textarea={true} label="Content" width={"$full"} height={"$32"} onChangeText={(content) => this.setState({ content })} />
            <Pilihan label="Status" selectedValue={status} onValueChange={(status) => this.ubahStatus(status)} />
            <Pilihan label="Category" selectedValue={category} datas={categoryUser} onValueChange={(selectedCategory) => this.setState({ category: selectedCategory })} />
            <Button type="text" title="Add New Category" onPress={this.toggleModal} padding={10} />
            <Button
              type="text"
              title="Save"
              padding={10}
              onPress={() => {
                this.onAddNote();
              }}
            />
          </FormControl>
        </Box>

        <Modal isOpen={isModalVisible} onClose={this.toggleModal} finalFocusRef={this.btnRef}>
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
                <InputField role="form" placeholder="Category Name" value={newCategory} onChangeText={(text) => this.setState({ newCategory: text })} />
              </GlueInput>
            </ModalBody>
            <ModalFooter>
              <Box flex={1} flexDirection="column" justifyContent="space-evenly">
                <Pressable
                  backgroundColor="$blue500"
                  p={"$2"}
                  borderRadius={"$sm"}
                  alignItems="center"
                  onPress={this.handleAddCategory} // Trigger category addition
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
                  onPress={this.toggleModal} // Close modal
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

export default Add;
