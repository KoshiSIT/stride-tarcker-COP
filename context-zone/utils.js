import "zone.js/dist/zone-node.js";
import {
  currentLayers,
  LayerStack,
  resetLayerStack,
} from "contextjs/lib/Layers.js";
export const useReplayLayerStack = (frame, zoneName) => {
  const zonedLayerStack = getCurrentLayerStack();
  frame.zoneName = zoneName;
  zonedLayerStack.push(frame);

  const deleteFromLayerStack = (_zoneName) => {
    const targetIndex = LayerStack.findIndex(
      (elm) => elm.zoneName === _zoneName
    );
    if (targetIndex != -1) {
      LayerStack.splice(targetIndex, 1);
    }
  };

  const restoreLayerStack = () => {
    console.log("restoreLayerStack");
    applyToLayerStack(zonedLayerStack);
  };

  const unrestoreLayerStack = () => {
    console.log("unrestoreLayerStack");
    zonedLayerStack.forEach((_frame) => {
      if (_frame.zoneName) {
        deleteFromLayerStack(_frame.zoneName);
      } else {
      }
    });
  };

  return [restoreLayerStack, unrestoreLayerStack];
};

export const useReplayZoneCurrent = (zone, rootZone) => {
  const replayZoneCurrent = (_zone) => {
    Object.defineProperty(Zone, "current", {
      value: _zone,
      writable: true,
      configurable: true,
      enumerable: false,
    });
  };

  const replayZoneCurrentEnter = () => replayZoneCurrent(zone);
  const replayZoneCurrentLeave = () => replayZoneCurrent(rootZone);

  return [replayZoneCurrentEnter, replayZoneCurrentLeave];
};

export const generateOnInvokeTaskCallback = (
  frame,
  zoneName,
  wrapWithFrameZone
) => {
  const [restoreLayerStack, unrestoreLayerStack] = useReplayLayerStack(
    frame,
    zoneName
  );
  return (delegate, curr, target, task, applyThis, applyArgs) => {
    console.log("onInvokeTask");
    let _task = task;
    _task = wrapCallbackTask(
      task,
      restoreLayerStack,
      unrestoreLayerStack,
      wrapWithFrameZone
    );

    return delegate.invokeTask(target, _task, applyThis, applyArgs);
  };
};

export const generateZoneName = () => {
  const chars = [];
  for (const char of "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx") {
    switch (char) {
      case "x":
        chars.push(Math.floor(Math.random() * 16).toString(16));
        break;
      case "y":
        chars.push((Math.floor(Math.random() * 4) + 8).toString(16));
        break;
      default:
        chars.push(char);
        break;
    }
  }
  return chars.join("");
};

export const wrapCallbackTask = (
  task,
  invokeTaskCallback,
  endTaskCallback,
  wrapWithFrameZone
) => {
  if (!task.isWrappedCallback) {
    const _callback = task.callback;
    task.callback = function () {
      console.log("Task will invoke:", task.type, task.source);
      invokeTaskCallback();
      wrapWithFrameZone(() => {
        _callback.apply(this, arguments);
      }).call();
      endTaskCallback();
    };
    task.isWrappedCallback = true;
  } else {
    //console.log("already wrapped");
  }
  console.log("wrapCallbackTask end");
  return task;
};

export const getCurrentLayerStack = () => {
  if (LayerStack.length === 0) {
    resetLayerStack();
  }
  return LayerStack.map((frame) => {
    const resultFrame = {};

    if (frame.withLayers) {
      resultFrame.withLayers = Array.from(frame.withLayers);
    }
    if (frame.withoutLayers) {
      resultFrame.withoutLayers = Array.from(frame.withoutLayers);
    }

    return Object.assign(resultFrame, frame);
  });
};
export const getCurrentFrame = () => {
  if (LayerStack.length === 0) {
    resetLayerStack();
  }
  let resultFrame = [];
  LayerStack.map((frame) => {
    if (frame.withLayers) {
      frame.withLayers.forEach((layer) => {
        resultFrame.push(layer);
      });
    }
  });
  // console.log(resultFrame);
  return resultFrame;
};

export const applyToLayerStack = (zonedLayerStack) => {
  const zlsLength = zonedLayerStack.length;
  const lsLength = LayerStack.length;
  const maxLengthCommonAncestry = Math.min(zlsLength, lsLength);
  let commonAncestryLength = 0;

  while (
    commonAncestryLength < maxLengthCommonAncestry &&
    zonedLayerStack[commonAncestryLength]?.zoneName ===
      LayerStack[commonAncestryLength]?.zoneName
  ) {
    commonAncestryLength++;
  }

  while (LayerStack.length > commonAncestryLength) {
    popFrame();
  }
  while (LayerStack.length < zlsLength) {
    pushFrame(zonedLayerStack[LayerStack.length]);
  }
};

export const popFrame = () => {
  console.log("popFrame");
  const beforePop = currentLayers();

  const frame = LayerStack.pop();
  const { withLayers, withoutLayers } = frame;

  const afterPop = currentLayers();

  /*
      withLayers &&
    withLayers
      .filter((l) => !beforePush.includes(l))
      .forEach((l) => l._emitActivateCallbacks());

  withoutLayers &&
    withoutLayers
      .filter((l) => beforePush.includes(l))
      .forEach((l) => l._emitDeactivateCallbacks());
    */
};

export const pushFrame = (frame) => {
  console.log("pushFrame");
  const { withLayers, withoutLayers } = frame;

  const beforePush = currentLayers();

  LayerStack.push(frame);

  /*
      withLayers &&
    withLayers
      .filter((l) => !beforePush.includes(l))
      .forEach((l) => l._emitActivateCallbacks());

  withoutLayers &&
    withoutLayers
      .filter((l) => beforePush.includes(l))
      .forEach((l) => l._emitDeactivateCallbacks());
    */
};
