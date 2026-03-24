import mockjs from "mockjs";

const Mock = {
    /**
     * 获取订单数据
     * @param type 0 普通订单，1 秒杀订单
     */
    getOrders(type) {
        const array = [];
        for (let i = 0; i < mockjs.Random.integer(5, 10); i++) {
            const order = mockjs.mock({
                "name": type === 0 ? "普通商品" + i : "秒杀商品" + i,
                "price": mockjs.Random.integer(20, 500) + "元",
                "number": mockjs.Random.integer(20, 500) + "个",
                "buyer": mockjs.Random.cname(),
                "time": mockjs.Random.datetime("yyyy-MM-dd A HH:mm:ss"),
                "role": mockjs.Random.boolean(), // true 经理,false 分销员
                "state": mockjs.Random.boolean(), // true 已完成,false 未完成
                "payType": mockjs.Random.boolean(), // true 微信,false 支付宝
                "source": mockjs.Random.url(),
                "phone": mockjs.mock(/\d{11}/)
            });
            array.push(order);
        }
        return array;
    },
    /**
     * 获取商品数据
     * @param type 0 普通商品，1 秒杀商品，2 今日推荐商品
     */
    getGoods(type) {
        const array = [];
        let goodsName = null;
        if (type === "0") {
            goodsName = "普通商品";
        } else if (type === "1") {
            goodsName = "秒杀商品";
        } else if (type === "2") {
            goodsName = "今日推荐商品";
        }
        for (let i = 0; i < mockjs.Random.integer(5, 10); i++) {
            const goods = mockjs.mock({
                "name": goodsName,
                "img": mockjs.Random.dataImage("60x100", goodsName),
                "price": mockjs.Random.integer(20, 500) + "元", // 价格
                "sellCount": mockjs.Random.integer(10, 100), // 销量
                "count": mockjs.Random.integer(10, 100), // 库存
                'refund': mockjs.Random.integer(10, 100), // 退款数量
                'refundPrice': mockjs.Random.integer(0, 5000) + '元',
                'owner': mockjs.Random.cname(),
                'time': mockjs.Random.datetime('yyyy-MM-dd A HH:mm:ss'),
                'state': mockjs.Random.boolean() // 是否上架
            });
            array.push(goods);
        }
        return array;
    },
    /**
     * 获取图表数据
     */
    getChartData() {
        const array = [];
        for (let i = 0; i < 6; i++) {
            array.push(mockjs.Random.integer(0, 100));
        }
        return array;
    },
    /**
     * 获取交易数据
     */
    getTradeData() {
        return mockjs.mock({
            "allTrade": mockjs.Random.integer(10000, 50000), // 交易总额
            "speTrade": mockjs.Random.integer(0, 5000), // 秒杀商品总额
            "norTrade": mockjs.Random.integer(0, 5000), // 普通商品总额
            "userCount": mockjs.Random.integer(0, 1000), // 用户数量
            "managerCount": mockjs.Random.integer(0, 1000), // 分销商户数量
            "time": mockjs.Random.datetime("yyyy-MM-dd A HH:mm:ss"), // 时间
        });
    }
};

export default Mock;