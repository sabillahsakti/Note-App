import React, { Component } from "react";
import { Box, Text } from "@gluestack-ui/themed";
import { CategoryTab, ListNote } from "../../components";
import { getNote } from "../../actions/AuthAction";

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userNotes: [],
      category: [],
    };
  }

  async componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("focus", async () => {
      const notes = await getNote();
      const categories = notes.map((note) => note.category);
      const uniqueCategories = categories.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
      this.setState({
        userNotes: notes,
        category: uniqueCategories,
      });
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    const { userNotes, category } = this.state;
    return (
      <Box marginHorizontal={"$2"} mt={"$10"}>
        <Box flexDirection="row" marginBottom={"$3"}>
          {category.map((note, index) => (
            <CategoryTab key={index} title={note} padding={"$2"} />
          ))}
        </Box>
        <Box flexDirection="row" marginBottom={"$3"}>
          {userNotes.map((note, index) => (
            <ListNote key={index} judul={note.title} isi={note.content} tanggal="tanggal" status={note.status} category={note.category} noteId={note.noteId} />
          ))}
        </Box>
      </Box>
    );
  }
}

export default Home;
