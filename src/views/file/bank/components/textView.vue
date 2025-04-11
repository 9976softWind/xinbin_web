<template>
  <div class="text-viewer">
    <div v-if="state.loading" class="status">加载中...</div>
    <div v-else-if="state.error" class="error">{{ state.error }}</div>
    <pre v-else class="text-content">{{ state.textContent }}</pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watchEffect, toRefs, onMounted } from "vue";
import axios from "axios";

interface TextViewerState {
  textContent: string;
  loading: boolean;
  error: string;
}

export default defineComponent({
  name: "TextViewer",
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const state = reactive<TextViewerState>({
      textContent: "",
      loading: false,
      error: "",
    });

    const fetchText = async () => {
      try {
        state.loading = true;
        state.error = "";
        const response = await axios.get(props.url, {
          responseType: "text",
        });
        state.textContent = response.data;
      } catch (err) {
        state.error = "无法加载文本内容";
        console.error("文本加载失败:", err);
      } finally {
        state.loading = false;
      }
    };

    // 自动追踪响应式依赖
    watchEffect(() => {
      if (props.url) {
        fetchText();
      }
    });

    return {
      state,
    };
  },
});
</script>

<style scoped>
/* 样式与之前版本保持一致 */
.text-viewer {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 16px;
  max-height: 500px;
  overflow: auto;
}

.status {
  color: #666;
  text-align: center;
  padding: 20px;
}

.error {
  color: #ff4444;
  padding: 20px;
  text-align: center;
}

.text-content {
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: monospace;
  margin: 0;
  line-height: 1.5;
}
</style>
