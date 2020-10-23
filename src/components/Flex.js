import React from "react";
import { View,  TouchableWithoutFeedback } from "react-native";
export default function Flex(props) {
  const {
    style,
    direction,
    wrap,
    justify,
    align,
    children,
    ...restProps
  } = props;
  const transferConstStyle = [justify, align].map(function (el) {
    var tempTxt = void 0;
    switch (el) {
      case "start":
        tempTxt = "flex-start";
        break;
      case "end":
        tempTxt = "flex-end";
        break;
      case "between":
        tempTxt = "space-between";
        break;
      case "around":
        tempTxt = "space-around";
        break;
      default:
        tempTxt = el;
        break;
    }
    return tempTxt;
  });
  var flexStyle = {
    flexDirection: direction,
    flexWrap: wrap,
    justifyContent: transferConstStyle[0],
    alignItems: transferConstStyle[1],
  };
  var inner = (
    <View style={[flexStyle, style]} {...restProps}>
      {children}
    </View>
  );
  var shouldWrapInTouchableComponent =
    restProps.onPress ||
    restProps.onLongPress ||
    restProps.onPressIn ||
    restProps.onPressOut;
  if (!!shouldWrapInTouchableComponent) {
    return (
      <TouchableWithoutFeedback {...restProps}>
        {inner}
      </TouchableWithoutFeedback>
    );
  }
  return inner;
}

Flex.defaultProps = {
  direction: "row",
  wrap: "nowrap",
  justify: "start",
  align: "center",
};
