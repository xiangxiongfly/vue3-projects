import dayjs from "dayjs";
import {computed, onUnmounted, ref} from "vue";

export function useCountDown() {
  let timer = null;
  const time = ref(0);

  const formatTime = computed(() => dayjs.unix(time.value).format("mm分ss秒"));

  const start = (currentTime) => {
    time.value = currentTime;
    timer = setInterval(() => {
      time.value--;
    }, 1000);
  };

  // 销毁时调用
  onUnmounted(() => {
    timer && clearInterval(timer);
  });

  return {start, formatTime};
}
