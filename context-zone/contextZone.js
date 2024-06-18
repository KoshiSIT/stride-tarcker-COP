import { withLayers, withoutLayers } from "contextjs";
import {
  generateOnInvokeTaskCallback,
  generateZoneName,
  getCurrentLayerStack,
  //   useReplayLayerStack,
  //   useReplayZoneCurrent,
} from "./utils.js";
import "zone.js/dist/zone-node.js";
import { createElement } from "react";
import React from "react";
var REACT_ELEMENT_TYPE = Symbol.for("react.element");
// import { ReactElement } from "react";
import { ReactElement } from "react/cjs/react-jsx-runtime.development.js";

const withFrame = (
  frame,
  activateCallback,
  wrapWithFrameZone,
  isActivation,
  layers
) => {
  const zoneName = generateZoneName();
  console.log("withFrame");
  console.log(zoneName);
  const onInvokeTaskCallback = generateOnInvokeTaskCallback(
    frame,
    zoneName,
    wrapWithFrameZone
  );
  console.log("Layercheck");
  // console.log(getCurrentLayerStack());
  // const beforeLayerComposition = JSON.parse(
  //   JSON.stringify(getCurrentLayerStack())
  // );
  const currentLayerStack = getCurrentLayerStack();
  const beforeLayerComposition = [...currentLayerStack];
  // console.log(beforeLayerComposition);
  const zone = Zone.current.fork({
    name: zoneName,
    properties: {
      beforeLayerComposition,
      layers,
      isActivation,
    },
    onInvokeTask: onInvokeTaskCallback,
  });

  activateCallback(zone);
};

export const withFrameZone = (layers, callback, isActivation) => {
  console.log("withFrameZone");
  const frame = { [isActivation ? "withLayers" : "withoutLayers"]: layers };
  const withDynamicExtent = isActivation ? withLayers : withoutLayers;
  const wrapWithFrameZone = (_callback) => () =>
    withFrameZone(layers, _callback, isActivation);
  let returnValue;
  withFrame(
    frame,
    (zone) => {
      // const [replayZoneCurrentEnter, replayZoneCurrentLeave] = useReplayZoneCurrent(zone, Zone.current);
      return withDynamicExtent(layers, () => {
        zone.run(() => {
          console.log("LayerStackInZone");
          console.log("run");
          console.log("zone name in withFrameZone" + Zone.current.name);
          returnValue = callback();
          // console.log(returnValue);
          console.log("run end");
        });
      });
    },
    wrapWithFrameZone,
    isActivation,
    layers
  );
  console.log("returnValue");
  // console.log(returnValue);
  return returnValue;
};

export const withLayersZone = (layers, callback) => {
  return withFrameZone(layers, callback, true);
};

export const withoutLayersZone = (layers, callback) => {
  return withFrameZone(layers, callback, false);
};

export const customCreateElement = (type, props, ...children) => {
  console.log("customCreateElement");
  if (Zone.current.name !== "<root>" && typeof type === "function") {
    console.log("type is a function");
    // console.log(type);
    type = wrapComponent(type);
  } else {
    // console.log("type is not a function");
  }

  const result = createElement(type, props, ...children);
  return result;
};
export const customReactElement = (
  type,
  key,
  ref,
  self,
  source,
  owner,
  props
) => {
  // console.log("customReactElement");
  let warpedType = type;

  if (Zone.current.name !== "<root>" && typeof type === "function") {
    console.log("type is a function");
    console.log("wrapComponent zoneName" + Zone.current.name);
    warpedType = wrapComponent(type);
  } else {
    // console.log("type is not a function");
  }

  // const result = ReactElementCP(
  //   Zone.current.name !== "<root>" && typeof type === "function"
  //     ? wrapComponent(type)
  //     : type,
  //   key,
  //   ref,
  //   self,
  //   source,
  //   owner,
  //   props
  // );

  const result = ReactElementCP(
    warpedType,
    key,
    ref,
    self,
    source,
    owner,
    props
  );

  return result;
};
const wrapComponent = (type) => {
  console.log("wrapComponent");
  console.log("wrapComponent zoneName" + Zone.current.name);
  if (Zone.current.name === "<root>") {
    console.log("root");
  }
  // console.log(Zone.current.get("layers"));
  console.log(Zone.current.get("isActivation"));
  const layers = Zone.current.get("layers");
  console.log(layers);
  const beforeLayerComposition = Zone.current.get("beforeLayerComposition");
  const isActivation = Zone.current.get("isActivation");
  const [restoreLayerStack, unrestoreLayerStack] = replayLayerStack(
    beforeLayerComposition
  );
  const oldType = type;
  // return (type.name = (props) => {
  //   // restoreLayerStack();
  //   // const result = withFrameZone(
  //   //   layers,
  //   //   () => {
  //   //     return type(props);
  //   //   },
  //   //   isActivation
  //   // );
  //   // unrestoreLayerStack();
  //   const result = oldType(props);
  //   // console.log(result);
  //   return result;
  // });
  const namedFunction = (name, func) => {
    console.log("namedFunction");
    // const nameList = ["Icon", "IconClass"];
    const nameList = ["Map", "StopWatch"];
    let isClass = true;
    // try {
    //   new func();
    //   isClass = true; // No error means it can be used as a constructor
    // } catch (e) {
    //   if (e.message.includes("is not a constructor")) return false;
    //   isClass = true; // Any other error means it's a class constructor
    // }
    try {
      Reflect.construct(func, []);
      isClass = true;
    } catch (e) {
      isClass = false;
    }

    console.log(isClass);

    if (isClass) {
      return func;
    }

    // console.log(func);
    const wrappedFunc = (...props) => {
      console.log("Starttttttttttttttttttt" + func.name);
      restoreLayerStack();
      const result = withFrameZone(
        layers,
        () => {
          return func.apply(null, props);
        },
        isActivation
      );
      unrestoreLayerStack();
      return result;
      // return func.apply(null, props);
    };

    Object.assign(wrappedFunc, func);
    wrappedFunc.prototype = func.prototype;
    Object.defineProperty(wrappedFunc, "name", { value: name });
    console.log(wrappedFunc);
    return wrappedFunc;
  };

  const newtype = namedFunction(oldType.name, oldType);
  // console.log(newtype);
  // console.log("oldtype");
  // console.log(oldType);
  // console.log("newtype");
  // console.log(newtype);
  // console.log(newtype.constructor);
  return newtype;
  // console.log("TEST" + typeof TEST);
  // console.log("type" + typeof type);
  // return TEST;
  // return TEST;
  // console.log(type);
  // return type;
};

const replayLayerStack = (targetLayerStack) => {
  const currentLayerStack = getCurrentLayerStack();
  const currentLayerStackClone = [...currentLayerStack];
  // const currentLayerStackClone = JSON.parse(JSON.stringify(currentLayerStack));

  console.log("targetLayerStack");
  console.log(targetLayerStack);
  const restoreLayerStack = () => {
    currentLayerStack.splice(0, currentLayerStack.length, ...targetLayerStack);
    console.log("restoreLayerStack");
  };
  const unrestoreLayerStack = () => {
    currentLayerStack.splice(
      0,
      currentLayerStack.length,
      ...currentLayerStackClone
    );
  };

  return [restoreLayerStack, unrestoreLayerStack];
};

var ReactElementCP = function (type, key, ref, self, source, owner, props) {
  // console.log('ReactElementttttttttttttttttttttttttt');
  var element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,
    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,
    // Record the component responsible for creating this element.
    _owner: owner,
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.

    Object.defineProperty(element._store, "validated", {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false,
    }); // self and source are DEV only properties.

    Object.defineProperty(element, "_self", {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self,
    }); // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.

    Object.defineProperty(element, "_source", {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source,
    });

    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }
  // console.log("return element");
  return element;
};
