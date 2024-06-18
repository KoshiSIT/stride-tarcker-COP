export const formatDate = (timestamp) => {
  if (!timestamp || typeof timestamp.toDate !== "function") {
    return "";
  } else {
    let date = timestamp.toDate();
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    return `${year}/${month}/${day}`;
  }
};
export const getActivityEnvironment = (activity) => {
  indoorList = [
    "walkingTreadmill",
    "runningTreadmill",
    "cyclingIndoor",
    "rowingMachine",
    "elliptical",
    "stairStepper",
    "swimmingPool",
  ];
  outdoorList = [
    "running",
    "cycling",
    "walking",
    "moutainBiking",
    "hiking",
    "downhillSkiing",
    "crossCountrySkiing",
    "snowboarding",
    "skating",
    "swimming",
    "wheelchair",
    "rowing",
    "elliptical",
  ];
  if (indoorList.includes(activity)) {
    return "indoor";
  } else if (outdoorList.includes(activity)) {
    return "outdoor";
  }
};
export const formatNumber = (str) => {
  const num = parseFloat(str);
  if (isNaN(num)) {
    return NaN;
  }
  return num.toFixed(2);
};
export const formatDateToJapaneseDayAndTime = (timestamp, language) => {
  if (!timestamp || typeof timestamp.toDate !== "function") {
    return "";
  }

  const date = timestamp.toDate();
  let days = [];
  let timeOfDay = "";
  if (language === "ja") {
    days = [
      "日曜日",
      "月曜日",
      "火曜日",
      "水曜日",
      "木曜日",
      "金曜日",
      "土曜日",
    ];
    timeOfDay = date.getHours() < 12 ? "午前" : "午後";
  } else if (language === "en") {
    days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    timeOfDay = date.getHours() < 12 ? "Evening" : "Afternoon";
  }
  const dayOfWeek = days[date.getDay()];

  return `${dayOfWeek}  ${timeOfDay}`;
};
export const getDateRange = (type) => {
  const now = new Date();
  let start, end;

  if (type === "week") {
    end = new Date();
    start = new Date(end);
    start.setDate(end.getDate() - 7);
  } else if (type === "month") {
    end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    start = new Date(now.getFullYear(), now.getMonth(), 1);
  } else if (type === "year") {
    end = new Date(now.getFullYear() + 1, 0, 0);
    start = new Date(now.getFullYear(), 0, 1);
  }

  return { start, end };
};
export const getDurationLabel = (datetime) => {
  const date = new Date(
    datetime.seconds * 1000 + datetime.nanoseconds / 1000000
  );
  const today = new Date();
  const startOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay()
  );
  const endOfWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay() + 6
  );
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const endOfYear = new Date(today.getFullYear(), 11, 31);

  if (date >= startOfWeek && date <= endOfWeek) {
    return "weekly";
  } else if (date >= startOfMonth && date <= endOfMonth) {
    return "monthly";
  } else if (date >= startOfYear && date <= endOfYear) {
    return "yearly";
  } else {
    return null;
  }
};

export const formatTime = (time) => {
  let minutes = time;
  if (typeof minutes === "string") {
    minutes = parseInt(minutes);
  }
  console.log("minutes", minutes);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const formattedHours = String(hours);
  const formattedMinutes = String(remainingMinutes).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
};

export const formatMinutes = (decimalTime) => {
  const minutes = Math.floor(decimalTime);
  const seconds = Math.round((decimalTime - minutes) * 60);

  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes}:${formattedSeconds}`;
};

export const formatWorkoutDetails = (workoutDetails) => {
  //workoutDetails="Fast_Time_2:23" , Slow_Distance_1.25_km
  // result = "2:23 Fast pace"
  // result = "1.25 km Slow pace"
  workoutDetails = workoutDetails.split("_");
  let pace = workoutDetails[0];
  let item1 = workoutDetails[1];
  let item2 = workoutDetails[2];
  if (item1 === "Time") {
    item1 = parseFloat(item1);
    item1 = item1.toFixed(2);
    return `${item2} ${pace} pace`;
  } else {
    item1 = parseFloat(item1);
    item1 = item1.toFixed(2);
    return `${item1} ${item2} ${pace} pace`;
  }
};
export const formatWorkoutDetailsToObj = (workoutDetails) => {
  console.log("formatting");
  // Fast_1.1_km
  // {
  //   distance1 : 1,
  //   distance2 : 1,
  //   distanceUnit : "km",
  //   minutes : 0,
  //   seconds : 0,
  //   paceSelected : "Fast",
  //   isTimeSelected : false,
  // }
  // Slow_Time_2:23
  // {
  //   distance1 : 0,
  //   distance2 : 0,
  //   distanceUnit : "",
  //   minutes : 2,
  //   seconds : 23,
  //   paceSelected : "Slow",
  //   isTimeSelected : true,
  // }

  const workoutDetailsObj = {
    distance1: 0,
    distance2: 0,
    distanceUnit: "",
    minutes: 0,
    seconds: 0,
    paceSelected: "",
    isTimeSelected: false,
  };
  if (!workoutDetails) {
    return workoutDetailsObj;
  }
  const workoutDetailsArr = workoutDetails.split("_");
  const paceSelected = workoutDetailsArr[0];
  const item1 = workoutDetailsArr[1];
  const item2 = workoutDetailsArr[2];
  if (item1 === "Time") {
    workoutDetailsObj["isTimeSelected"] = true;
    const time = item2.split(":");
    workoutDetailsObj["minutes"] = parseInt(time[0]);
    workoutDetailsObj["seconds"] = parseInt(time[1]);
  } else {
    workoutDetailsObj["isTimeSelected"] = false;
    const distance = item1.split(".");
    console.log(distance);
    workoutDetailsObj["distance1"] = parseInt(distance[0]);
    workoutDetailsObj["distance2"] = parseInt(distance[1]);
    workoutDetailsObj["distanceUnit"] = item2;
  }
  workoutDetailsObj["paceSelected"] = paceSelected;
  return workoutDetailsObj;
};
