<script setup>
import {KEY_TOKEN} from "@/global/constants.js";
import useLoginStore from "@/stores/loginStore.js";
import {localCache} from "@/utils/cache.js";
import {pathToBreadcrumb} from "@/utils/maps.js";
import {computed, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();
const loginStore = useLoginStore();

const userMenus = loginStore.userMenus;
const emit = defineEmits(["handleFoldMenu"]);
const isFold = ref(false);
const handleFoldMenu = () => {
  isFold.value = !isFold.value;
  emit("handleFoldMenu", isFold.value);
};

const crumbs = computed(() => {
  return pathToBreadcrumb(route.path, userMenus);
});

const handleExitClick = () => {
  localCache.removeCache(KEY_TOKEN);
  router.push("/login");
};
</script>

<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleFoldMenu">
      <el-icon size="28px">
        <component :is="isFold?'Expand':'Fold'"/>
      </el-icon>
    </div>
    <div class="content">
      <div class="crumb">
        <el-breadcrumb separator-icon="CaretRight">
          <template v-for="item in crumbs" :key="item.name">
            <el-breadcrumb-item :to="item.path">
              {{ item.name }}
            </el-breadcrumb-item>
          </template>
        </el-breadcrumb>
      </div>
      <div class="header-info">
        <div class="operation">
          <span>
            <el-icon><Message/></el-icon>
          </span>
          <span>
            <span class="dot"></span>
            <el-icon><ChatDotRound/></el-icon>
          </span>
          <span>
           <el-icon><Search/></el-icon>
          </span>
        </div>
        <div class="info">
          <el-dropdown>
              <span class="user-info">
                <el-avatar :size="30" src="https://www.baidu.com/img/flexible/logo/pc/result.png"/>
                <span class="name">{{ loginStore.userInfo.name }}</span>
              </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="handleExitClick">
                  <el-icon>
                    <CircleClose/>
                  </el-icon>
                  <span>退出系统</span>
                </el-dropdown-item>
                <el-dropdown-item divided>
                  <el-icon>
                    <InfoFilled/>
                  </el-icon>
                  <span>个人信息</span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-icon>
                    <Unlock/>
                  </el-icon>
                  <span>修改密码</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;

    .header-info {
      display: flex;
      flex-direction: row;
      align-items: center;

      .operation {
        display: inline-flex;
        margin-right: 20px;

        span {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 35px;

          &:hover {
            background-color: #f2f2f2;
          }

          i {
            font-size: 20px;
          }

          .dot {
            position: absolute;
            top: 3px;
            right: 3px;
            width: 6px;
            height: 6px;
            background-color: red;
            border-radius: 100%;
            z-index: 10;
          }
        }
      }

      .info {
        .user-info {
          display: flex;
          flex-direction: row;
          align-items: center;
          cursor: pointer;

          .name {
            margin-left: 5px;
          }
        }
      }
    }
  }
}

:global(.el-dropdown-menu__item) {
  line-height: 36px;
  padding: 6px 22px;
}
</style>

