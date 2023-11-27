import React, { useState, useEffect } from "react";
import { Box, FlatList } from "@gluestack-ui/themed";
import { CategoryTab, ListNote } from "../../components";
import { getNote } from "../../actions/AuthAction";

const Home = ({ navigation }) => {
  const [userNotes, setUserNotes] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const notes = await getNote();
      const categories = notes.map((note) => note.category);
      const uniqueCategories = Array.from(new Set(categories));
      setUserNotes(notes);
      setCategory(uniqueCategories);
    };

    const unsubscribe = navigation.addListener("focus", fetchData);

    return () => {
      unsubscribe();
    };
  }, [navigation]);

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
