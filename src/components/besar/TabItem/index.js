import { Text, Pressable, Box } from "@gluestack-ui/themed";
import React from "react";
import { IconHome, IconHomeActive, IconProfile, IconProfileActive, IconAdd, IconAddActive } from "../../../assets";

const TabItem = ({ isFocused, onPress, onLongPress, label }) => {
  const Icon = () => {
    if (label === "Home") {
      return isFocused ? <IconHomeActive /> : <IconHome />;
    }
    if (label === "Add") {
      return isFocused ? <IconAddActive /> : <IconAdd />;
    }
    if (label === "Profile") {
      return isFocused ? <IconProfileActive /> : <IconProfile />;
    }
    return <IconHome />;
  };
  return (
    <Pressable onPress={onPress} onLongPress={onLongPress} alignItems="center" flexDirection="column" justifyContent="space-between">
        <Icon />
        <Text color={isFocused ? "$white" : "$lightBlue400"} fontSize={"$md"} marginTop={"$2"}>{label}</Text>
    </Pressable>
  );
};

export default TabItem;
