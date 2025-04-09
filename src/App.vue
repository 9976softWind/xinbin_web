<script setup lang="ts">
import { useAppStore } from "@/store/modules/app";
import { useRoute } from "vue-router";
const route = useRoute();
const appStore = useAppStore();
</script>

<template>
  <el-config-provider :locale="appStore.locale" :size="appStore.size">
    <router-view :key="route.fullPath" />
  </el-config-provider>
</template>
<style lang="scss">
.el-table__body-wrapper :empty::before {
  content: "--";
}
.el-table-column--selection :empty::before {
  content: "";
}

.el-icon-info {
  vertical-align: center;
  cursor: pointer;
  width: 15px;
  height: 32px;
  line-height: 32px;
  margin-left: 5px;
}
</style>
