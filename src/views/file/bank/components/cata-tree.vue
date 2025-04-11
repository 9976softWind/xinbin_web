<!-- 文件目录树 -->
<template>
  <el-card shadow="never">
    <el-input v-model="cataName" placeholder="目录名称" clearable>
      <template #prefix>
        <i-ep-search />
      </template>
    </el-input>

    <el-tree
      ref="cataTreeRef"
      class="mt-2"
      :data="cataList"
      :props="{ children: 'children', label: 'label', disabled: '' }"
      :expand-on-click-node="false"
      :filter-node-method="handleFilter"
      default-expand-all
      @node-click="handleNodeClick"
    />
  </el-card>
</template>

<script setup lang="ts">
import { getCataOptions } from "@/api/cata";

const props = defineProps({
  modelValue: {
    type: [Number],
    default: undefined,
  },
});

const cataList = ref<OptionType[]>(); // 目录列表
const cataTreeRef = ref(ElTree); // 目录树
const cataName = ref(); // 目录名称

const emits = defineEmits(["node-click"]);

const cataId = useVModel(props, "modelValue", emits);

watchEffect(
  () => {
    cataTreeRef.value.filter(cataName.value);
  },
  {
    flush: "post", // watchEffect会在DOM挂载或者更新之前就会触发，此属性控制在DOM元素更新后运行
  }
);

/** 目录筛选 */
function handleFilter(value: string, data: any) {
  if (!value) {
    return true;
  }
  return data.label.indexOf(value) !== -1;
}

/** 目录树节点 Click */
function handleNodeClick(data: { [key: string]: any }) {
  cataId.value = data.value;
  emits("node-click");
}

onBeforeMount(() => {
  getCataOptions().then((response) => {
    cataList.value = response.data;
  });
});
</script>
