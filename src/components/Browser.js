import React, { useState, useRef, useEffect } from "react";
import { WebView } from "react-native-webview";
import styles from "./Browser.style";
import { SearchBar } from "./SearchBar";
import { View } from "react-native";
import { NavigationBar } from "./NavigationBar";
import favorite from "./Start";
export const Browser = () => {
  const webview = useRef({ current: null });
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState({
    html: favorite(),
  });
  const [history, setHistory] = useState({});
  const isScrollDown =
    lastScrollPosition > 0 &&
    lastScrollPosition <= scrollPosition &&
    scrollPosition >= 88;
  const onScroll = ({ nativeEvent }) => {
    setLastScrollPosition(scrollPosition);
    const { y } = nativeEvent.contentOffset;
    setScrollPosition(y > 0 ? y : 0);
  };
  const onLoadStart = () => {
    setLastScrollPosition(0);
    setScrollPosition(0);
    setLoading(true);
  };
  const onLoadEnd = () => {
    setLoading(false);
  };
  const onLoadError = () => {
    setLoading(false);
  };
  const forward = () => webview.current && webview.current.goForward();
  const backward = () => webview.current && webview.current.goBack();
  const reload = () => webview.current && webview.current.reload();
  const stop = () => {
    webview.current && webview.current.stopLoading();
  };
  return (
    <>
      <View style={styles.container}>
        <SearchBar
          onCancel={() => {}}
          onStop={stop}
          onSearch={(uri) => setSource({ uri })}
          onReload={reload}
          isScrollDown={isScrollDown}
          url={history.url}
          loaded={!loading}
          loading={loading}>
          <WebView
            style={styles.webview}
            ref={webview}
            source={source}
            contentInsetAdjustmentBehavior={"always"}
            allowsBackForwardNavigationGestures
            allowsInlineMediaPlayback
            startInLoadingState
            incognito
            onScroll={onScroll}
            onLoadStart={onLoadStart}
            onLoadEnd={onLoadEnd}
            onLoadError={onLoadError}
            onNavigationStateChange={setHistory}
          />
        </SearchBar>
        <NavigationBar
          isScrollDown={isScrollDown}
          onForward={forward}
          onBackward={backward}
          history={history}
        />
      </View>
    </>
  );
};
