import TabItem from "../TabItem";
import { Box } from "@gluestack-ui/themed";

const BottomNavigator = ({ state, descriptors, navigation }) => {
  return (
    <Box position="absolute" left={"$0"} right={"$0"} bottom={"$0"} paddingVertical={"$5"} paddingHorizontal={"$5"} margin={"$2"} flexDirection="row" backgroundColor="$blue" hardShadow="5" borderRadius={"$xl"} justifyContent="space-around">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return <TabItem key={index} label={label} isFocused={isFocused} onPress={onPress} onLongPress={onLongPress} />;
      })}
    </Box>
  );
};

export default BottomNavigator;