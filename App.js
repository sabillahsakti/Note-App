import { NavigationContainer } from "@react-navigation/native";
import Router from "./src/router/index";
import * as React from "react";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

function App() {
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </GluestackUIProvider>
  );
}

export default App;
