import React, { useState, useEffect } from "react";
import { Box, FlatList } from "@gluestack-ui/themed";
import { CategoryTab, ListNote } from "../../components";

const Home = ({ navigation }) => {
  const [userNotes, setUserNotes] = useState([
    { noteId: 1, title: 'Note 1', content: 'Lorem ipsum...', status: 'Active', category: 'Work' },
    { noteId: 2, title: 'Note 2', content: 'Lorem ipsum...', status: 'Inactive', category: 'Personal' },
    { noteId: 3, title: 'Note 3', content: 'Lorem ipsum...', status: 'Active', category: 'Work' },
    { noteId: 4, title: 'Note 4', content: 'Lorem ipsum...', status: 'Active', category: 'Study' },
    // Add more dummy notes as needed
  ]);
  const [category, setCategory] = useState(['Work', 'Personal', 'Study', 'Others']); // Replace with your desired categories
  const [selectedCategory, setSelectedCategory] = useState(null);

  const onCategoryPress = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
  };
  
  const filteredNotes = selectedCategory ? userNotes.filter((note) => note.category === selectedCategory) : userNotes;

  return (
    <Box py="$3" px="$2" marginTop="$10">
      <FlatList data={category} renderItem={({ item, index }) => <CategoryTab key={index} title={item} padding="$2" margin="$2" onPress={() => onCategoryPress(item)} />} horizontal={true} mb={"$4"} />
      <FlatList
        data={filteredNotes}
        renderItem={({ item }) => <ListNote key={item.noteId} judul={item.title} isi={item.content} tanggal="tanggal" status={item.status} category={item.category} noteId={item.noteId} />}
        keyExtractor={(item) => item.noteId}
      />
    </Box>
  );
};

export default Home;
