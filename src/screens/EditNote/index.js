import React, { useState, useEffect } from "react";
import { Alert, Box, Heading, Text, FormControl, Modal, ModalBackdrop, AlertText, Fab, FabLabel, FabIcon, ArrowLeftIcon, ScrollView } from "@gluestack-ui/themed";
import { Button, Input, Pilihan } from "../../components";
import { editNote, getNote } from "../../actions/AuthAction";
import BackFAB from "../../components/kecil/back_fab";


const EditNote = ({ route, navigation }) => {
  const [title, setTitle] = useState(route.params.judul);
  const [content, setContent] = useState(route.params.isi);
  const [category, setCategory] = useState(route.params.category);
  const [status, setStatus] = useState(route.params.status);
  const [noteId, setNoteId] = useState(route.params.noteId);
  const [categoryUser, setCategoryUser] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const ubahStatus = (status) => {
    setStatus(status);
  };

  const toggleAlert = (message) => {
    setShowAlert(!showAlert);
    setAlertMessage(message);
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

  const onEditNote = async () => {
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
          <Input label={"Title"} width={"$full"} height={"$10"} value={title} onChangeText={(title) => setTitle(title)} />
          <Input textarea={true} label="Content" width={"$full"} height={"$32"} value={content} onChangeText={(content) => setContent(content)} />
          <Pilihan label="Status" value={status} selectedValue={status} onValueChange={(status) => ubahStatus(status)} />
          <Pilihan label="Category" selectedValue={category} datas={categoryUser} onValueChange={(selectedCategory) => setCategory(selectedCategory)} />
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
  );
};

export default EditNote;
