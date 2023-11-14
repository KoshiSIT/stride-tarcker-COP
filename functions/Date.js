export const formatDate = (timestamp) => {
  if (!timestamp || typeof timestamp.toDate !== "function") {
    return "";
  } else {
    let date = timestamp.toDate(); // timestampをDateオブジェクトに変換
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    return `${year}/${month}/${day}`;
  }
};
export const formatNumber = (str) => {
  const num = parseFloat(str);
  if (isNaN(num)) {
    return NaN; // またはエラーを投げる、または別のデフォルト値を返す
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
