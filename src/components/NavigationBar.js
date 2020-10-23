import React from "react";
import { IconOutline } from "@ant-design/icons-react-native";
import Flex from "./Flex";
import styles from "./Browser.style";
import { SafeAreaView } from "react-native";
const getColor = (enabled) => {
  return enabled ? "rgb(0,122,255)" : "#ccc";
};
export function NavigationBar({
  onForward,
  onBackward,
  isScrollDown,
  history,
}) {
  if (isScrollDown) return null;
  return (
    <SafeAreaView>
      <Flex style={styles.navigationBar} align="center" justify="center">
        <IconOutline
          name="left"
          size={18}
          color={getColor(history.canGoBack)}
          onPress={onBackward}
          disabled={!history.canGoBack}
          style={styles.navigationButton}
        />
        <IconOutline
          name="right"
          size={18}
          color={getColor(history.canGoForward)}
          onPress={onForward}
          disabled={!history.canGoForward}
          style={styles.navigationButton}
        />
      </Flex>
    </SafeAreaView>
  );
}
