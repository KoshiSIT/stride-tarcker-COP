import React from "react";
import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorageManager from "../functions/AsyncStorageManager";

const WorkoutContext = createContext();
export function useWorkoutContext() {
  return useContext(WorkoutContext);
}
export function WorkoutProvider({ children }) {
  const as = new AsyncStorageManager();
  const [withWorkout, setWithWorkout] = useState(false);
  const [workoutDetails, setWorkoutDetails] = useState([]);
  const [withRepeat, setWithRepeat] = useState(false);
  const [repeatTimes, setRepeatTimes] = useState(0);
  const [withWarmUp, setWithWarmUp] = useState(false);
  const [withCoolDown, setWithCoolDown] = useState(false);
  const [workouts, setWorkouts] = useState(null);

  const handleSetWithWorkout = () => {
    setWithWorkout(!withWorkout);
  };
  const handleSetWorkoutDetails = (workoutDetails) => {
    setWorkoutDetails(workoutDetails);
  };
  const handleSetWithRepeat = (withRepeat) => {
    setWithRepeat(withRepeat);
  };
  const handleSetWithWarmUp = (withWarmUp) => {
    setWithWarmUp(withWarmUp);
  };
  const handleSetWithCoolDown = (withCoolDown) => {
    setWithCoolDown(withCoolDown);
  };
  const handleSetWorkouts = (workouts) => {
    setWorkouts(workouts);
  };
  const handleSetRepeatTimes = (repeatTimes) => {
    setRepeatTimes(repeatTimes);
  };
  const handleDeleteWorkout = (workoutPresetID) => {
    delete workouts[workoutPresetID];
    console.log(workouts);
  };
  const value = {
    workoutDetails,
    handleSetWorkoutDetails,
    withRepeat,
    handleSetWithRepeat,
    repeatTimes,
    handleSetRepeatTimes,
    withWarmUp,
    handleSetWithWarmUp,
    withCoolDown,
    handleSetWithCoolDown,
    workouts,
    withWorkout,
    handleSetWithWorkout,
    handleSetWorkouts,
    handleDeleteWorkout,
  };
  useEffect(() => {
    as.getAllWorkoutPresets().then((workouts) => {
      handleSetWorkouts(workouts);
    });
  }, []);
  return (
    <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>
  );
}
