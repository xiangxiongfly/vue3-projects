import {coordinateData} from "@/utils/coordinate-data.js";

/**
 * 转换为地图数据
 */
export function convertMapData(data) {
    const mapData = [];
    for (let i = 0; i < data.length; i++) {
        const locations = coordinateData[data[i].name];
        if (locations) {
            mapData.push({
                name: data[i].name,
                value: [...locations, data[i].value]
            });
        }
    }
    return mapData;
}