<!-- 饼图 -->
<template>
  <el-card>
    <template #header> 告警事件</template>
    <div :id="id" :class="className" :style="{ height, width }"></div>
  </el-card>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { getAlarmsApi } from "@/api/dashboard/index";
const all = ref("");
const processed = ref("");
const unprocessed = ref("");
const props = defineProps({
  id: {
    type: String,
    default: "pieChart",
  },
  className: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "200px",
    required: true,
  },
  height: {
    type: String,
    default: "200px",
    required: true,
  },
});

onMounted(() => {
  getAlarmsApi().then((res) => {
    all.value = res.data.all;
    processed.value = res.data.processed;
    unprocessed.value = res.data.unprocessed;

    const options = {
      color: ["#009dff", "#22e4ff", "#3bffd0", "#04e38a", "#9dff86"],

      grid: {
        left: "2%",
        right: "2%",
        bottom: "10%",
        containLabel: true,
      },
      legend: {
        bottom: "0%",
        textStyle: {
          color: "#999",
        },
      },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          // name: "Nightingale Chart",
          type: "pie",
          radius: "60%",
          // center: ["50%", "50%"],
          // roseType: "area",
          // itemStyle: {
          //   borderRadius: 1,
          //   color: function (params: any) {
          //     //自定义颜色
          //     const colorList = ["#409EFF", "#67C23A", "#E6A23C", "#F56C6C"];
          //     return colorList[params.dataIndex];
          //   },
          // },
          label: {
            formatter: " {c}  ",
            textStyle: {
              color: "#000",
            },
            overflow: "none",
          },
          data: [
            { value: processed.value, name: "已处理" },
            { value: unprocessed.value, name: "未处理" },
          ],
        },
      ],
    };
    const chart = echarts.init(
      document.getElementById(props.id) as HTMLDivElement
    );
    chart.setOption(options);
    window.addEventListener("resize", () => {
      chart.resize();
    });
  });
});
</script>
<style lang="scss" scoped>
.el-card :deep(.el-card__header) {
  padding: 10px;
  font-weight: 600;
}
.el-card :deep(.el-card__body) {
  padding: 0;
}
</style>
