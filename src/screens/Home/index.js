import React, { useState, useEffect } from "react";
import { Box, Text } from "@gluestack-ui/themed";
import { CategoryTab, ListNote } from "../../components";
import { getNote } from "../../actions/AuthAction";

const Home = ({ navigation }) => {
  const [userNotes, setUserNotes] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const notes = await getNote();
      const categories = notes.map((note) => note.category);
      const uniqueCategories = categories.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
      setUserNotes(notes);
      setCategory(uniqueCategories);
    };

    const unsubscribe = navigation.addListener("focus", fetchData);

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  return (
    <Box marginHorizontal={"$2"} mt={"$10"}>
      <Box flexDirection="row" marginBottom={"$3"}>
        {category.map((note, index) => (
          <CategoryTab key={index} title={note} padding={"$2"} />
        ))}
      </Box>
      <Box flexDirection="row" marginBottom={"$3"}>
        {userNotes.map((note, index) => (
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
