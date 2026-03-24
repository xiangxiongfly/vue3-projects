import {useIntersectionObserver} from "@vueuse/core";

export const lazyPlugin = {
  install(app) {
    // 图片懒加载
    app.directive("img-lazy", {
      mounted(el, binding) {
        // el：目标元素
        // binding.value：绑定的值
        const {stop} = useIntersectionObserver(
          el,
          ([entry]) => {
            if (entry.isIntersecting) {
              // console.log("进入视口");
              el.src = binding.value;
              stop();
            }
          }
        );
      }
    });
  }
};
