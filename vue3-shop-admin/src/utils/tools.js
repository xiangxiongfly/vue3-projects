const Tools = {
    /**
     * 导出json文件
     * @param name 文件名
     * @param data 数据
     */
    exportJson(name, data) {
        const blob = new Blob([data]);
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = name;
        link.click();
    }
};

export default Tools;