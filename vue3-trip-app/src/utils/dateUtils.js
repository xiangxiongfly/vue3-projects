import dayjs from "dayjs";

export function diffDays(startDate, endDate) {
    return dayjs(endDate).diff(startDate, "day");
}

export function formatMonthDay(date, formatStr = "MM月DD日") {
    return dayjs(date).format(formatStr);
}