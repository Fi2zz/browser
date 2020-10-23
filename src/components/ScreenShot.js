import React, { useState } from "react";
import { Button, Image, SafeAreaView, useWindowDimensions } from "react-native";
import RNShare from "react-native-share";
import { SnapshotView } from "./SnapshotView";
import image10 from "./WechatIMG10.jpeg";
import image57 from "./WechatIMG57.jpeg";
import image58 from "./WechatIMG58.jpeg";

const share = (image) => {
  RNShare.open({
    title: "Snapshot Image",
    urls: [image ?? ""],
    failOnCancel: false,
    message: "Snapshot Image",
  });
};

export function CapturableView({}) {
  const { width, height } = useWindowDimensions();
  const [image, setImage] = useState(null);
  const views = [image10, image57, image58];
  return (
    <SafeAreaView style={{ flex: 1, width, height }}>
      <SnapshotView
        length={views.length}
        onCapture={setImage}
        renderItem={({ style, index }) => (
          <Image source={views[index]} style={style}></Image>
        )}
      />
      <Button title="open" onPress={() => share(image)}></Button>
      <Image
        source={{ uri: image, isStatic: true }}
        style={{ width: 250, height: 250 }}></Image>
    </SafeAreaView>
  );
}
