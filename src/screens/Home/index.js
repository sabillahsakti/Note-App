import React, { useState, useEffect } from "react";
import { Box } from "@gluestack-ui/themed";
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

  const filteredNotes = selectedCategory
    ? userNotes.filter((note) => note.category === selectedCategory)
    : userNotes;

  return (
    <Box marginHorizontal="$2" marginTop="$10">
      <Box flexDirection="row" marginBottom="$3">
        {category.map((note, index) => (
          <CategoryTab
            key={index}
            title={note}
            padding="$2"
            onPress={() => onCategoryPress(note)}
          />
        ))}
      </Box>
      <Box flexDirection="column" marginBottom="$3">
        {filteredNotes.map((note, index) => (
          <ListNote
            key={index}
            judul={note.title}
            isi={note.content}
            tanggal="tanggal"
            status={note.status}
            category={note.category}
            noteId={note.noteId}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Home;
