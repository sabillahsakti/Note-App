import React, { Component } from "react";
import { Alert, Box, Heading, Text, FormControl, Modal, ModalBackdrop, AlertText } from "@gluestack-ui/themed";
import { Button, Input, Pilihan } from "../../components";
import { editNote, getNote } from "../../actions/AuthAction";

export class EditNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.route.params.judul,
      content: props.route.params.isi,
      category: props.route.params.category,
      status: props.route.params.status,
      noteId: props.route.params.noteId,
      categoryUser: [],

      //Alert handling
      showAlert: false,
      alertMessage: "",
    };
  }

  ubahStatus = (status) => {
    this.setState({
      status: status,
    });
  };

  toggleAlert = (message) => {
    this.setState({ showAlert: !this.state.showAlert, alertMessage: message });
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

  onEditNote = async () => {
    const { title, content, status, category, noteId } = this.state;

    if (title && content && status && category) {
      const data = {
        title: title,
        content: content,
        status: status,
        category: category,
      };

      console.log(data);
      try {
        const user = await editNote(noteId, data);
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
    const { title, content, status, category, categoryUser, showAlert, alertMessage } = this.state;
    return (
      <Box flex={1} backgroundColor="$white" justifyContent="center">
        <Box shadowColor="$black" shadowOffset={{ width: 0, height: 2 }} shadowOpacity={"$25"} shadowRadius={"$3.5"} elevation={"$5"} backgroundColor="$white" borderRadius={"$md"} mt={"$8"} mx={"$3"} px={"$3"} pt={"$2"}>
          <Heading size="2xl" color="$black">
            Edit Your Task!
          </Heading>
          <Text size="sm" color="$black" my={"$1"}>
            Having a mistake? An edit got you covered!
          </Text>
          <FormControl>
            <Input label={"Title"} width={"$full"} height={"$10"}  value={title} onChangeText={(title) => this.setState({ title })} />
            <Input textarea={true} label="Content" width={"$full"} height={"$32"} value={content} onChangeText={(content) => this.setState({ content })} />
            <Pilihan label="Status" value={status} selectedValue={status} onValueChange={(status) => this.ubahStatus(status)} />
            <Pilihan label="Category" selectedValue={category} datas={categoryUser} onValueChange={(selectedCategory) => this.setState({ category: selectedCategory })} />
            <Button
              type="text"
              title="Update"
              padding={10}
              onPress={() => {
                this.onEditNote();
              }}
            />
          </FormControl>
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

export default EditNote;
