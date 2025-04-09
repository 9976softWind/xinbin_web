<!-- 饼图 -->
<template>
  <el-card>
    <template #header> 设备分类 </template>
    <div :id="id" :class="className" :style="{ height, width }"></div>
  </el-card>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { getClassificationApi } from "@/api/dashboard/index";
const DP = ref("");
const ZQ = ref("");
const ZZ = ref("");
const SM = ref("");
const MM = ref("");
const other = ref("");
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
  getClassificationApi().then((res) => {
    DP.value = res.data.DP;
    ZQ.value = res.data.ZQ;
    ZZ.value = res.data.ZZ;
    SM.value = res.data.SM;
    MM.value = res.data.MM;
    other.value = res.data.other;
    const options = {
      grid: {
        left: "2%",
        right: "2%",
        bottom: "10%",
        containLabel: true,
      },
      legend: {
        top: "bottom",
        textStyle: {
          color: "#999",
        },
      },
      tooltip: {
        trigger: "item",
      },
      xAxis: {
        type: "category",
        data: ["泵站", "渠道", "流量计", "墒情", "气象", "其他"],
        axisLabel: {
          textStyle: {
            color: "#999",
          },
        },
        axisLine: {
          lineStyle: {
            color: "#999",
          },
        },
      },
      yAxis: {
        type: "value",
        axisLabel: {
          textStyle: {
            color: "#999",
          },
        },
        axisLine: {
          lineStyle: {
            color: "#999",
          },
        },
        splitLine: {
          lineStyle: {
            color: "#eee",
          },
        },
      },
      series: [
        {
          type: "bar",
          barWidth: "60%",
          label: {
            show: true,
            position: "top",
            formatter: " {c}  ",
            textStyle: {
              color: "#000",
            },
            overflow: "none",
          },
          data: [
            { value: DP.value, name: "泵站" },
            { value: ZZ.value, name: "渠道" },
            { value: ZQ.value, name: "流量计" },
            { value: SM.value, name: "墒情" },
            { value: MM.value, name: "气象" },
            { value: other.value, name: "其他" },
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
