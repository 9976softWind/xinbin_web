<!-- 饼图 -->
<template>
  <el-card>
    <template #header>
      <p>上报数据</p>
      <el-button-group>
        <el-button
          v-for="item in option"
          :key="item.value"
          @click="changedata(item.value)"
          >{{ item.label }}</el-button
        >
      </el-button-group>
    </template>
    <div :id="id" :class="className" :style="{ height, width }"></div>
  </el-card>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { getClassificationApi } from "@/api/dashboard/index";
const option = [
  // {
  //   value: 1,
  //   label: "前一天",
  // },
  {
    value: 2,
    label: "前三天",
  },
  {
    value: 3,
    label: "前七天",
  },
];
const data = ref([
  ["product", "水质", "降雨", "水情", "工情"],
  ["2023-12-22", 40, 50, 80, 45],
  ["2023-12-21", 80, 70, 50, 30],
  ["2023-12-20", 80, 60, 80, 50],
  // ["工情总计", 70, 50, 40, 45],
]);
// const data1 = ref([
//   ["product", "水质", "降雨", "水情", "工情"],
//   ["2023-12-22", 40, 50, 80, 45],
//   ["2023-12-21", 80, 70, 50, 30],
//   ["2023-12-20", 80, 60, 80, 50],
//   // ["工情总计", 70, 50, 40, 45],
// ]);
const data2 = ref([
  ["product", "水质", "降雨", "水情", "工情"],
  ["2023-12-22", 40, 50, 80, 45],
  ["2023-12-21", 80, 70, 50, 30],
  ["2023-12-20", 80, 60, 80, 50],
  // ["工情总计", 70, 50, 40, 45],
]);
const data3 = ref([
  ["product", "水质", "降雨", "水情", "工情"],
  ["2023-12-22", 40, 50, 80, 45],
  ["2023-12-21", 80, 70, 50, 30],
  ["2023-12-20", 80, 60, 80, 50],
  ["2023-12-19", 40, 50, 80, 45],
  ["2023-12-18", 80, 70, 50, 30],
  ["2023-12-17", 80, 60, 80, 50],
  ["2023-12-16", 80, 60, 80, 50],
  // ["工情总计", 70, 50, 40, 45],
]);
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
function changedata(item: any) {
  console.log(item);
  // if (item == 1) {
  //   data.value = data1.value;
  //   drawLine();
  // }
  if (item == 2) {
    data.value = data2.value;
    drawLine();
  }
  if (item == 3) {
    data.value = data3.value;
    drawLine();
  }
}
const drawLine = () => {
  const myChart = echarts.init(document.getElementById(props.id));
  // const options = {
  //   color: ["#009dff", "#22e4ff", "#3bffd0", "#04e38a", "#9dff86"],
  //   // legend: {
  //   //   data: ["降雨量"],
  //   // },
  //   tooltip: {
  //     trigger: "axis",
  //   },
  //   grid: {
  //     left: "3%",
  //     right: "4%",
  //     bottom: "3%",
  //     containLabel: true,
  //   },
  //   xAxis: {
  //     type: "category",
  //     boundaryGap: false,
  //     data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  //   },
  //   yAxis: {
  //     type: "value",
  //   },
  //   series: [
  //     {
  //       data: data.value,
  //       areaStyle: {},
  //       type: "line",
  //     },
  //   ],
  // };
  const options = {
    legend: {},
    tooltip: {},
    dataset: {
      source: data.value,
    },
    xAxis: { type: "category" },
    yAxis: {},
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [
      { type: "bar" },
      { type: "bar" },
      { type: "bar" },
      { type: "bar" },
    ],
  };
  myChart.setOption(options);
  window.addEventListener("resize", () => {
    myChart.resize();
  });
};

onMounted(() => {
  getClassificationApi().then((res) => {
    drawLine();
    // const options = {
    //   legend: {
    //     data: ["降雨量"],
    //   },
    //   xAxis: {
    //     type: "category",
    //     boundaryGap: false,
    //     data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    //   },
    //   yAxis: {
    //     type: "value",
    //   },
    //   series: [
    //     {
    //       data: data.value,
    //       areaStyle: {},
    //       type: "line",
    //     },
    //   ],
    // };
    // const chart = echarts.init(
    //   document.getElementById(props.id) as HTMLDivElement
    // );
    // chart.setOption(options);
    // window.addEventListener("resize", () => {
    //   chart.resize();
    // });
  });
});
</script>
<style lang="scss" scoped>
.el-card :deep(.el-card__header) {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  p {
    font-weight: 600;
    margin: 0;
  }
}
.el-card :deep(.el-card__body) {
  padding: 0;
}
</style>
