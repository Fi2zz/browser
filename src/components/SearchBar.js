import React, { useState, useRef, forwardRef } from "react";
import { TextInput, Button, Text, SafeAreaView, View } from "react-native";
import { ifAboutBlank, engine } from "./helper";
import { IconOutline, IconFill } from "@ant-design/icons-react-native";
import Flex from "./Flex";
import styles, { getCollapsed } from "./Browser.style";
import { parse } from "url";

const DEFAULT_PLACEHOLDER = `搜索或输入网站名称`;

const SearchCore = forwardRef((props, ref) => {
  const {
    onBlur,
    onFocus,
    onChangeText,
    onSubmitEditing,
    defaultValue,
    onCancel,
    collapsed,
  } = props;

  return (
    <Flex flex={1} style={styles.searchBarCore}>
      <TextInput
        ref={ref}
        style={[styles.searchInput]}
        placeholder={DEFAULT_PLACEHOLDER}
        defaultValue={defaultValue}
        keyboardType="url"
        returnKeyType="go"
        autoCapitalize="none"
        clearButtonMode={"while-editing"}
        onBlur={onBlur}
        onFocus={onFocus}
        selectTextOnFocus={true}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
      />
      <Button onPress={onCancel} title={"取消"} />
    </Flex>
  );
});

export const SearchBar = ({
  isScrollDown,
  onSearch,
  onReload,
  url,
  children,
  loading,
}) => {
  const input = useRef(null);
  const [search, setSearch] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const _uri = engine(search);
  const _cancel = () => {
    input && input.current.blur();

    ifAboutBlank(url, (yes) => {
      if (!yes && url) {
        setSearch(url);
      }
    });
  };
  const focus = () => input && input.current.focus();
  const toggleFocus = () => setInputFocused(!inputFocused);
  const onChangeText = (value) => setSearch(value.toLowerCase());
  const onSubmitEditing = () => onSearch(_uri);
  const { host } = parse(url ?? "");
  const isSearchKeyWord = _uri.includes(`wd=${search}`);
  const placeholder = {
    text: isSearchKeyWord
      ? search
      : ifAboutBlank(url, (_true) => (_true ? DEFAULT_PLACEHOLDER : host)),
    icon: (isSearchKeyWord || !search) && "search",
  };

  const reloadable = Boolean(!loading && search);

  return (
    <>
      <SafeAreaView>
        <Flex style={[styles.searchBar]}>
          <SearchCore
            ref={input}
            defaultValue={search}
            onFocus={toggleFocus}
            onCancel={_cancel}
            onBlur={toggleFocus}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            collapsed={isScrollDown || !inputFocused}
          />
          <Placeholder
            onPress={focus}
            onReload={onReload}
            placeholder={placeholder}
            isFocused={inputFocused}
            isScrollDown={isScrollDown}
            reloadable={reloadable}
          />
        </Flex>
      </SafeAreaView>
      {children}
    </>
  );
};

function Placeholder({
  onPress,
  onReload,
  placeholder,
  isFocused,
  isScrollDown,
  reloadable,
}) {
  if (isFocused) return null;

  if (isScrollDown) {
    return (
      <Flex style={styles.collapsedPlaceholder}>
        {placeholder.icon && (
          <IconFill name={placeholder.icon} size={12}></IconFill>
        )}
        <Text>{placeholder.text}</Text>
      </Flex>
    );
  }
  return (
    <Flex style={styles.searchPlaceholder} onPress={onPress}>
      <IconOutline name={placeholder.icon} size={16} color="#999"></IconOutline>
      <Text
        style={[
          placeholder.text
            ? styles.searchPlaceholderText
            : styles.searchPlaceholderDefaultText,
        ]}>
        {placeholder.text || "搜索或输入网站名称"}
      </Text>
      {reloadable && (
        <IconOutline
          name="reload"
          size={18}
          onPress={onReload}
          style={styles.searchReloadButton}
        />
      )}
    </Flex>
  );
}
