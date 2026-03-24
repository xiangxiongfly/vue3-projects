<script setup>
import {useCityStore} from "@/stores/useCityStore.js";
import {useHomeStore} from "@/stores/useHomeStore.js";
import {useMainStore} from "@/stores/useMainStore.js";
import {diffDays, formatMonthDay} from "@/utils/dateUtils.js";
import {storeToRefs} from "pinia";
import {computed, ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();

const cityStore = useCityStore();
const {currentCity} = storeToRefs(cityStore);
const clickCity = () => {
  router.push("/city");
};
const clickPosition = () => {
  navigator.geolocation.getCurrentPosition(res => {
    console.log("定位成功：", res);
  }, err => {
    console.log("定位失败：", err);
  }, {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  });
};

const mainStore = useMainStore();
const showCalendar = ref(false);
const {startDate, endDate} = storeToRefs(mainStore);
const stayCount = ref(diffDays(startDate.value, endDate.value));
const startDateStr = computed(() => {
  return formatMonthDay(startDate.value);
});
const endDateStr = computed(() => {
  return formatMonthDay(endDate.value);
});
const onConfirm = (value) => {
  const selectStartDate = value[0];
  const selectEndData = value[1];
  mainStore.startDate = selectStartDate;
  mainStore.endDate = selectEndData;
  stayCount.value = diffDays(selectStartDate, selectEndData);
  showCalendar.value = false;
};

// 热门建议
const homeStore = useHomeStore();
const {hotSuggests} = storeToRefs(homeStore);
const clickSearch = () => {
  router.push({
    path: "/search",
    query: {
      startDate: startDate.value,
      endDate: endDate.value,
      currentCity: currentCity.value.cityName,
    }
  });
};
</script>

<template>
  <div class="search">
    <!--    位置   -->
    <div class="location bottom-gray-line">
      <div class="city" @click="clickCity">{{ currentCity.cityName }}</div>
      <div class="position" @click="clickPosition">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="">
      </div>
    </div>

    <!--    日期范围   -->
    <div class="section date-range bottom-gray-line" @click="showCalendar = true">
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time">{{ startDateStr }}</span>
        </div>
      </div>
      <div class="stay">共{{ stayCount }}晚</div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time">{{ endDateStr }}</span>
        </div>
      </div>
    </div>
    <van-calendar
        v-model:show="showCalendar"
        type="range"
        color="#ff9854"
        :round="false"
        :show-confirm="true"
        @confirm="onConfirm"/>

    <!--    价格/人数选择 -->
    <div class="section price-counter bottom-gray-line">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>

    <!--    关键字 -->
    <div class="section bottom-gray-line">关键字/位置/民宿名</div>

    <!--    热门建议 -->
    <div class="section hot-suggests">
      <template v-for="(item,index) in hotSuggests" :key="index">
        <div class="item" :style="{color:item.tagText.color,backgroundColor:item.tagText.background.color}">
          {{ item.tagText.text }}
        </div>
      </template>
    </div>

    <!--    搜索按钮 -->
    <div class="section search-btn">
      <div class="btn" @click="clickSearch">开始搜索</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search {
  --van-calendar-popup-height: 100%;
}

.location {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 20px;

  .city {
    flex: 1;
    color: #333;
    font-size: 15px;
  }

  .position {
    width: 74px;
    display: flex;
    align-items: center;

    .text {
      position: relative;
      top: 2px;
      color: #666;
      font-size: 12px;
    }

    img {
      margin-left: 5px;
      width: 18px;
      height: 18px;
    }
  }
}

.section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 20px;
  color: #999;
  height: 44px;

  .start {
    flex: 1;
    display: flex;
    height: 44px;
    justify-content: center;
    align-items: center;
  }

  .end {
    flex: 1;
    display: flex;
    height: 44px;
    justify-content: center;
    align-items: center;
  }
}

.date-range {
  height: 44px;

  .stay {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #666;
  }

  .date {
    display: flex;
    flex-direction: column;
    align-items: center;

    .tip {
      font-size: 12px;
      color: #999;
    }

    .time {
      margin-top: 3px;
      color: #333;
      font-size: 15px;
      font-weight: 500;
    }
  }
}

.price-counter {

  .start {
    border-right: 1px solid var(--line-color);
  }
}

.hot-suggests {
  margin: 10px 0;
  height: auto;

  .item {
    padding: 4px 8px;
    margin: 4px;
    border-radius: 14px;
    font-size: 12px;
    line-height: 1;
  }
}

.search-btn {
  .btn {
    width: 342px;
    height: 38px;
    max-height: 50px;
    font-weight: 500;
    font-size: 18px;
    line-height: 38px;
    text-align: center;
    border-radius: 20px;
    color: #fff;
    background-image: var(--theme-linear-gradient);
  }
}

.bottom-gray-line {
  border-bottom: 1px solid var(--line-color)
}
</style>