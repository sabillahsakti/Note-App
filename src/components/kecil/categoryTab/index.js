import React from 'react'
import {Text, Pressable} from "@gluestack-ui/themed"

const CategoryTab = ({padding, title, onPress, fontSize}) => {
  return (
    <Pressable onPress={onPress} padding={padding} backgroundColor="$blue700" borderRadius={"$lg"}>
      <Text color="$white" textAlign="center" fontSize={fontSize ? fontSize : "$lg"}>{title}</Text>
    </Pressable>
  )
}

export default CategoryTab;