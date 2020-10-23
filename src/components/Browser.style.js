import { StyleSheet, Dimensions, Appearance } from "react-native";
const { width, height } = Dimensions.get("window");
import { getStatusBarHeight, getBottomSpace } from "./ifIphoneX";
const INPUT_HEIGHT = 50;
const NAVIGATION_BAR_HEIGHT = 44;

let isDarkMode = Appearance.getColorScheme() == "dark";
Appearance.addChangeListener(({ colorScheme }) => {
  isDarkMode = colorScheme == "dark";
});

const whenDarkMode = (dark, def) => {
  return isDarkMode ? dark : def;
};

const WEBVIEW_HEIGHT =
  height -
  getStatusBarHeight(true) -
  getBottomSpace() -
  INPUT_HEIGHT -
  NAVIGATION_BAR_HEIGHT;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    backgroundColor: whenDarkMode("rgb(31,31,31)", "#fff"),
  },

  collapsed: {
    height: 0,
    overflow: "hidden",
    padding: 0,
    margin: 0,
    width: 0,
  },

  webview: {
    width,
    flex: 1,
    height: "100%",
    backgroundColor: "red",
  },
  mask: {
    backgroundColor: whenDarkMode("rgba(130,130,130,1)", "white"),
    ...StyleSheet.absoluteFillObject,
    zIndex: 9,
    top: INPUT_HEIGHT + getStatusBarHeight(true),
  },

  collapsedPlaceholder: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  searchBar: {
    width,
    paddingBottom: 10,
    paddingHorizontal: 10,
    borderBottomColor: whenDarkMode("#fff0", "#ccc"),
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
    justifyContent: "center",
  },

  searchBarCore: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchInput: {
    height: 40,
    fontSize: 16,
    paddingHorizontal: 12,
    width: width - 84,
    backgroundColor: whenDarkMode("rgb(50,50,50)", "#eee"),
    color: whenDarkMode("rgb(50,50,50)", "#333"),
    borderRadius: 8,
    position: "relative",
    zIndex: 6,
  },
  searchPlaceholderText: {
    fontSize: 16,
    color: whenDarkMode("#999", "#333"),
  },
  searchPlaceholderDefaultText: {
    fontSize: 16,
    paddingLeft: 6,
    color: "#999",
  },
  searchPlaceholder: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    position: "absolute",
    top: 0,
    zIndex: 99,
    left: 10,
    right: 10,
    backgroundColor: whenDarkMode("rgb(50,50,50)", "#eee"),
    borderRadius: 8,
    flex: 1,
  },
  searchReloadButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 0,
    top: 0,
    lineHeight: 40,
    paddingRight: 10,
    textAlign: "right",
    color: whenDarkMode("rgb(148,148,148)", "#333"),
  },
  navigationBar: {
    height: NAVIGATION_BAR_HEIGHT,
    width,
    borderTopColor: whenDarkMode("rgba(0,0,0,1)", "#ccc"),
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  navigationButton: {
    width: 88,
    textAlign: "center",
  },

  navigationButtonDisabled: {},
});
export const getCollapsed = (defaults, should) => {
  return [defaults, should && styles.collapsed];
};

export default styles;
