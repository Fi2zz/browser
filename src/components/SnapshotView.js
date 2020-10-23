import React, { useEffect, useRef, useState, useImperativeHandle } from "react";
import { PixelRatio, useWindowDimensions, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import ViewShot from "react-native-view-shot";

export function SnapshotView({ length, renderItem, onCapture }, ref) {
  const autoCapture = typeof onCapture == "function";
  const views = Array.from({ length });
  const viewsRefs = views.map((_) => useRef(null));
  const carousel = useRef(null);
  const _mounted = useRef(false);
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);

  const options = () => {
    const targetPixelCount = 1080;
    const pixelRatio = PixelRatio.get();
    // The pixel ratio of the device
    // pixels * pixelratio = targetPixelCount, so pixels = targetPixelCount / pixelRatio
    const pixels = targetPixelCount / pixelRatio;
    return {
      result: "tmpfile",
      height: pixels,
      width: pixels,
      quality: 0.8,
      format: "jpg",
    };
  };

  const _capture = async (index) => {
    const ref = viewsRefs[index];
    if (ref && ref.current) {
      try {
        const capture = ref.current.capture;
        const uri = await capture();
        if (!autoCapture) return [uri, null];
        onCapture(uri);
      } catch (error) {
        console.log(error);
        return [null, error];
      }
    }
  };

  useEffect(() => {
    // if (!autoCapture) return () => {};
    const id = setTimeout(() => {
      if (!_mounted.current) {
        _capture(0);
        _mounted.current = true;
      }
    }, 300);

    _capture(currentIndex);
    return () => clearTimeout(id);
  }, [currentIndex]);

  const slideStyle = {};
  let itemWidth = width;
  const sliderWidth = width;
  const contentContainerCustomStyle = {
    paddingHorizontal: 0,
  };

  const containerStyle = {
    width,
    height: width,
  };
  if (views.length > 1) {
    slideStyle.marginLeft = 24;
    itemWidth = width * 0.840579710144928;
    containerStyle.height = itemWidth + 1;
  }
  const itemStyle = { width: itemWidth, height: itemWidth, borderWidth: 1 };
  return (
    <View style={containerStyle}>
      <Carousel
        data={views}
        sliderWidth={sliderWidth}
        slideStyle={slideStyle}
        itemWidth={itemWidth}
        hasParallaxImages={false}
        layoutCardOffset={0}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        activeSlideAlignment={"start"}
        onSnapToItem={setCurrentIndex}
        ref={carousel}
        scrollEnabled={views.length > 1}
        contentContainerCustomStyle={contentContainerCustomStyle}
        renderItem={({ index, item }) => (
          <ViewShot ref={viewsRefs[index]} options={options()}>
            {renderItem({ index, item, style: itemStyle })}
          </ViewShot>
        )}
      />
    </View>
  );
}
