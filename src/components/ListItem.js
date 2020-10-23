import React from "react";
import {
  GestureResponderEvent,
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import Icon from "../icon";
import { WithTheme, WithThemeStyles } from "../style";
import {
  BriefProps as BriefBasePropsType,
  ListItemPropsType,
} from "./PropsType";
import ListStyles, { ListStyle } from "./style/index";

export class Brief extends React.Component {
  render() {
    const { children, style, wrap } = this.props;

    let numberOfLines = {};

    if (wrap === false) {
      numberOfLines = {
        numberOfLines: 1,
      };
    }
    return (
      <WithTheme styles={this.props.styles} themeStyles={ListStyles}>
        {(styles) => (
          <View style={[styles.Brief]}>
            <Text style={[styles.BriefText, style]} {...numberOfLines}>
              {children}
            </Text>
          </View>
        )}
      </WithTheme>
    );
  }
}

export default function Item() {
  const {
    styles,
    children,
    multipleLine,
    thumb,
    extra,
    arrow,
    style,
    onPress,
    onPressIn,
    onPressOut,
    onLongPress,
    delayLongPress,
    wrap,
    disabled,
    align,
    ...restProps
  } = this.props;

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onLongPress={onLongPress}
      delayLongPress={delayLongPress}
      disabled={disabled}>
      <View {...restProps} style={[style]}>
        {thumb}
        {children}
        {extra}
      </View>
    </TouchableOpacity>
  );
}
