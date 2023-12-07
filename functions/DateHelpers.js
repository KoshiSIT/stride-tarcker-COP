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
