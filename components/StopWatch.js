import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Svg, Line, Circle } from "react-native-svg";
import { stopWatchModeLayer } from "../cop/LayerDefinition";

const StopWatch = ({ time }) => {
  // console.log("stopppppppppppppppppppppppppppppppppppppppppppp");
  class StopWatch {
    constructor() {
      this.clockRadius = 150;
      this.clockCenter = { x: 150, y: 150 };
    }
    main() {
      return this.render();
    }
    getSeconds() {
      return time % 60;
    }
    getMinutes() {
      return Math.floor(time / 60);
    }
    renderClockTicks() {
      const elements = [];
      const offset = 17;
      for (let i = 0; i < 60; i++) {
        const angle = (i * 360) / 60;
        const isHourTick = i % 5 === 0;
        if (isHourTick) {
          // Draw a line for hour ticks
          const lineLength = 15;
          const x1 =
            this.clockCenter.x +
            (this.clockRadius - lineLength - offset) *
              Math.sin((angle * Math.PI) / 180);
          const y1 =
            this.clockCenter.y -
            (this.clockRadius - lineLength - offset) *
              Math.cos((angle * Math.PI) / 180);
          const x2 =
            this.clockCenter.x +
            (this.clockRadius - offset) * Math.sin((angle * Math.PI) / 180);
          const y2 =
            this.clockCenter.y -
            (this.clockRadius - offset) * Math.cos((angle * Math.PI) / 180);
          elements.push(
            <Line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="lightgray"
              strokeWidth="2"
              key={i}
            />
          );
        } else {
          // Draw a circle for minute ticks
          const circleRadius = 2;
          const x =
            this.clockCenter.x +
            (this.clockRadius - circleRadius - offset) *
              Math.sin((angle * Math.PI) / 180);
          const y =
            this.clockCenter.y -
            (this.clockRadius - circleRadius - offset) *
              Math.cos((angle * Math.PI) / 180);
          elements.push(
            <Circle cx={x} cy={y} r={circleRadius} fill="lightgray" key={i} />
          );
        }
      }
      return elements;
    }
    render() {
      return (
        <View style={styles.container}>
          <Svg height="300" width="300">
            <Circle
              cx="150"
              cy="150"
              r="145"
              stroke="lightgray"
              strokeWidth="3"
              fill="transparent"
            />
            {this.renderClockTicks()}
            <Line
              x1="150"
              y1="150"
              x2="150"
              y2="70"
              stroke="black"
              strokeWidth="4"
              transform={`rotate(${6 * this.getMinutes()}, 150, 150)`}
            />
            <Line
              x1="150"
              y1="170"
              x2="150"
              y2="19"
              stroke="#0000CC"
              strokeWidth="3"
              transform={`rotate(${6 * this.getSeconds()}, 150, 150)`}
            />
            <Circle cx="150" cy="150" r="8" fill="black" />
            <Circle cx="150" cy="150" r="4" fill="#0000CC" />
          </Svg>
        </View>
      );
    }
  }
  stopWatchModeLayer.refineClass(StopWatch, {
    render() {
      return (
        <View style={styles.container}>
          <Svg height="300" width="300">
            <Circle
              cx="150"
              cy="150"
              r="145"
              stroke="lightgray"
              strokeWidth="3"
              fill="transparent"
            />
            {this.renderClockTicks()}
            <Line
              x1="150"
              y1="150"
              x2="150"
              y2="70"
              stroke="black"
              strokeWidth="4"
              transform={`rotate(${6 * this.getMinutes()}, 150, 150)`}
            />
            <Line
              x1="150"
              y1="170"
              x2="150"
              y2="19"
              stroke="#0000CC"
              strokeWidth="3"
              transform={`rotate(${6 * this.getSeconds()}, 150, 150)`}
            />
            <Circle cx="150" cy="150" r="8" fill="black" />
            <Circle cx="150" cy="150" r="4" fill="red" />
          </Svg>
        </View>
      );
    },
  });
  const stopWatch = new StopWatch();
  return stopWatch.main();
};
export default StopWatch;
const styles = StyleSheet.create({
  container: {
    flex: 7,
    justifyContent: "center",
    alignItems: "center",
  },
});
