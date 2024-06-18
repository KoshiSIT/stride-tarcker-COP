import { TouchableOpacity } from "react-native";

import React, { useEffect, useState, useRef, useContext } from "react";

import { withLayers } from "contextjs";
import {
  getCurrentLayerStack,
  getCurrentFrame,
} from "../../context-zone/utils";
export default function ContextTouch({ style, onPress, context }) {
  //   console.log("context: ", context);
  console.log("aaa");
  console.log(getCurrentFrame());
  const [layers, setLayers] = useState([]);
  useEffect(() => {
    // const layers = getCurrentLayerStack();
    // console.log("layers: ", layers);
    // setLayers(layers);
  }, []);
  const contextOnPress = () => {
    withLayers(context, () => {
      onPress();
    });
  };
  return (
    <TouchableOpacity style={style} onPress={contextOnPress}></TouchableOpacity>
  );
}
