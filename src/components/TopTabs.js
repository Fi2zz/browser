import React from "react";
import {
  ScrollView,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Dimensions,
  useWindowDimensions,
} from "react-native";

import { Actions } from "react-native-router-flux";

const {} = Dimensions.get("window");

export function TopTabs() {
  const { width } = useWindowDimensions();

  return (
    <View
      style={{ width, height: 40, overflow: "hidden", backgroundColor: "red" }}>
      <View style={{ height: 40, width, backgroundColor: "green" }}></View>
      {/* <ScrollView>

        <View style={{ height: 40, width, backgroundColor: "green" }}></View>
      </ScrollView> */}
    </View>
  );
}
