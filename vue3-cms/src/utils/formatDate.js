import dayjs from "dayjs";

/**
 * 格式化日期时间
 */
export function formatDate(dateStr, format = "YYYY-MM-DD HH:mm:ss") {
    return dayjs(dateStr).format(format);
}