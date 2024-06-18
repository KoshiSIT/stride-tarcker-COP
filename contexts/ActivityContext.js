import React from "react";
import { createContext, useState, useContext } from "react";

const ActivityContext = createContext();

export function useActivityContext() {
  return useContext(ActivityContext);
}

export function ActivityProvider({ children }) {
  const [time, setTime] = useState(0);
  const [pace, setPace] = useState(0);
  const [locationLog, setLocationLog] = useState([]);
  const [calorie, setCalorie] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);
  const handleSetTotalDistance = (distance) => {
    setTotalDistance(totalDistance);
  };
  const handleSetTime = (time) => {
    setTime(time);
  };
  const handleSetPace = (pace) => {
    setPace(pace);
  };
  const handleSetLocationLog = (locationLog) => {
    setLocationLog(locationLog);
  };
  const handleSetCalorie = (calorie) => {
    setCalorie(calorie);
  };
  const resetTime = () => {
    setTime(0);
  };
  const resetPace = () => {
    setPace(0);
  };
  const resetLocationLog = () => {
    setLocationLog([]);
  };
  const resetCalorie = () => {
    setCalorie(0);
  };
  const resetAllState = () => {
    resetTime();
    resetPace();
    resetLocationLog();
    resetCalorie();
  };
  const value = {
    time,
    handleSetTime,
    pace,
    handleSetPace,
    locationLog,
    handleSetLocationLog,
    calorie,
    handleSetCalorie,
    totalDistance,
    handleSetTotalDistance,
    resetAllState,
  };

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
}
