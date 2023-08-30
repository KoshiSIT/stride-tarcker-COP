

export const formatDate = (timestamp) => {
    if (!timestamp || typeof timestamp.toDate !== 'function') {
        return '';
    } else {
        let date = timestamp.toDate();  // timestampをDateオブジェクトに変換
        let year = date.getFullYear();
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');

        return `${year}/${month}/${day}`;
    }
}
export const formatDateToJapaneseDayAndTime = (timestamp) => {
    if (!timestamp || typeof timestamp.toDate !== 'function') {
        return '';
    }

    const date = timestamp.toDate();
    const days = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];
    const dayOfWeek = days[date.getDay()];
    const timeOfDay = date.getHours() < 12 ? "午前" : "午後";

    return `${dayOfWeek}${timeOfDay}`;
}
