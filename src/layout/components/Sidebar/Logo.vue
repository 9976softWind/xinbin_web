<script lang="ts" setup>
import defaultSettings from "@/settings";
import { useSettingsStore } from "@/store/modules/settings";

const settingsStore = useSettingsStore();

defineProps({
  collapse: {
    type: Boolean,
    required: true,
  },
});

const logo = ref(new URL(`../../../assets/logo.png`, import.meta.url).href);
</script>

<template>
  <div
    class="w-full h-[50px] bg-gray-800 dark:bg-[var(--el-bg-color-overlay)] logo-wrap"
  >
    <transition name="sidebarLogoFade">
      <router-link
        v-if="collapse"
        key="collapse"
        class="h-full w-full flex items-center justify-center"
        to="/"
      >
        <!-- <img v-if="settingsStore.sidebarLogo" :src="logo" class="w-5 h-5" /> -->
      </router-link>

      <router-link
        v-else
        key="expand"
        class="h-full w-full flex items-center justify-center"
        to="/"
      >
        <!-- <img v-if="settingsStore.sidebarLogo" :src="logo" class="w-5 h-5" /> -->
        <span class="ml-3 text-white text-sm font-bold">
          <!-- {{ defaultSettings.title }} {{ defaultSettings.version }}</span -->
          {{ defaultSettings.title }}</span
        >
      </router-link>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
// https://cn.vuejs.org/guide/built-ins/transition.html#the-transition-component
.sidebarLogoFade-enter-active {
  transition: opacity 2s;
}

.sidebarLogoFade-leave-active,
.sidebarLogoFade-enter-from,
.sidebarLogoFade-leave-to {
  opacity: 0;
}
</style>
