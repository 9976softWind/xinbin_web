<script setup lang="ts">
import StatusPieChart from "./components/StatusPieChart.vue";
import TypePieChart from "./components/TypePieChart.vue";
import AlarmPieChart from "./components/AlarmPieChart.vue";
import DataLineChart from "./components/DataLineChart.vue";

defineOptions({
  name: "Dashboard",
  inheritAttrs: false,
});

// import { useUserStore } from "@/store/modules/user";
// import { useTransition, TransitionPresets } from "@vueuse/core";

// const userStore = useUserStore();
// const date: Date = new Date();

// const greetings = computed(() => {
//   const hours = date.getHours();
//   if (hours >= 6 && hours < 8) {
//     return "晨起披衣出草堂，轩窗已自喜微凉🌅！";
//   } else if (hours >= 8 && hours < 12) {
//     return "上午好，" + useUserStore().user.nickname + "！";
//   } else if (hours >= 12 && hours < 18) {
//     return "下午好，" + useUserStore().user.nickname + "！";
//   } else if (hours >= 18 && hours < 24) {
//     return "晚上好，" + useUserStore().user.nickname + "！";
//   } else if (hours >= 0 && hours < 6) {
//     return "偷偷向银河要了一把碎星，只等你闭上眼睛撒入你的梦中，晚安🌛！";
//   }
// });

// const duration = 5000;

// 销售额
// const amount = ref(0);
// const amountOutput = useTransition(amount, {
//   duration: duration,
//   transition: TransitionPresets.easeOutExpo,
// });
// amount.value = 2000;

// 访客数
// const visitCount = ref(0);
// const visitCountOutput = useTransition(visitCount, {
//   duration: duration,
//   transition: TransitionPresets.easeOutExpo,
// });
// visitCount.value = 2000;

// IP数
// const dauCount = ref(0);
// const dauCountOutput = useTransition(dauCount, {
//   duration: duration,
//   transition: TransitionPresets.easeOutExpo,
// });
// dauCount.value = 2000;

// 订单量
// const orderCount = ref(0);
// const orderCountOutput = useTransition(orderCount, {
//   duration: duration,
//   transition: TransitionPresets.easeOutExpo,
// });
// orderCount.value = 2000;
</script>

<template>
  <div class="dashboard-container">
    <!-- github角标 -->
    <!-- <github-corner class="github-corner" /> -->

    <!-- <el-card shadow="never">
      <el-row justify="space-between">
        <el-col :span="18" :xs="24">
          <div class="flex h-full items-center">
            <img
              class="w-20 h-20 mr-5 rounded-full"
              :src="userStore.user.avatar + '?imageView2/1/w/80/h/80'"
            />
            <div>
              <p>{{ greetings }}</p>
              <p class="text-sm text-gray">
                今日天气晴朗，气温在15℃至25℃之间，东南风。
              </p>
            </div>
          </div>
        </el-col>
 <el-col :span="6" :xs="24">
          <div class="flex h-full items-center justify-around">
            <el-statistic :value="99">
              <template #title>
                <div class="flex items-center">
                  <svg-icon icon-class="message" size="20px" />
                  <span class="text-[16px] ml-1">消息</span>
                </div>
              </template>
            </el-statistic>

            <el-statistic :value="50">
              <template #title>
                <div class="flex items-center">
                  <svg-icon icon-class="todolist" size="20px" />
                  <span class="text-[16px] ml-1">待办</span>
                </div>
              </template>
              <template #suffix>/100</template>
            </el-statistic>

            <el-statistic :value="10">
              <template #title>
                <div class="flex items-center">
                  <svg-icon icon-class="project" size="20px" />
                  <span class="text-[16px] ml-1">项目</span>
                </div>
              </template>
            </el-statistic>
          </div>
        </el-col> 
      </el-row>
    </el-card> -->

    <!-- 数据卡片 -->
    <!-- <el-row :gutter="10" class="mt-3">
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="never">
          <template #header>
            <div class="flex items-center justify-between">
              <span class="text-[var(--el-text-color-secondary)]">访客数</span>
              <el-tag type="success">日</el-tag>
            </div>
          </template>

          <div class="flex items-center justify-between mt-5">
            <div class="text-lg text-right">
              {{ Math.round(visitCountOutput) }}
            </div>
            <svg-icon icon-class="visit" size="2em" />
          </div>

          <div
            class="flex items-center justify-between mt-5 text-sm text-[var(--el-text-color-secondary)]"
          >
            <span> 总访客数 </span>
            <span> {{ Math.round(visitCountOutput * 15) }} </span>
          </div>
        </el-card>
      </el-col>

      消息数
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="never">
          <template #header>
            <div class="flex items-center justify-between">
              <span class="text-[var(--el-text-color-secondary)]">IP数</span>
              <el-tag type="success">日</el-tag>
            </div>
          </template>

          <div class="flex items-center justify-between mt-5">
            <div class="text-lg text-right">
              {{ Math.round(dauCountOutput) }}
            </div>
            <svg-icon icon-class="ip" size="2em" />
          </div>

          <div
            class="flex items-center justify-between mt-5 text-sm text-[var(--el-text-color-secondary)]"
          >
            <span> 总IP数 </span>
            <span> {{ Math.round(dauCountOutput) }} </span>
          </div>
        </el-card>
      </el-col>

      销售额
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="never">
          <template #header>
            <div class="flex items-center justify-between">
              <span class="text-[var(--el-text-color-secondary)]">销售额</span>
              <el-tag>月</el-tag>
            </div>
          </template>

          <div class="flex items-center justify-between mt-5">
            <div class="text-lg text-right">
              {{ Math.round(amountOutput) }}
            </div>
            <svg-icon icon-class="money" size="2em" />
          </div>

          <div
            class="flex items-center justify-between mt-5 text-sm text-[var(--el-text-color-secondary)]"
          >
            <span> 总销售额 </span>
            <span> {{ Math.round(amountOutput * 15) }} </span>
          </div>
        </el-card>
      </el-col>

      订单量
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="never">
          <template #header>
            <div class="flex items-center justify-between">
              <span class="text-[var(--el-text-color-secondary)]">订单量</span>
              <el-tag type="danger">季</el-tag>
            </div>
          </template>

          <div class="flex items-center justify-between mt-5">
            <div class="text-lg text-right">
              {{ Math.round(orderCountOutput) }}
            </div>
            <svg-icon icon-class="order" size="2em" />
          </div>

          <div
            class="flex items-center justify-between mt-5 text-sm text-[var(--el-text-color-secondary)]"
          >
            <span> 总订单量 </span>
            <span> {{ Math.round(orderCountOutput * 15) }} </span>
          </div>
        </el-card>
      </el-col>
    </el-row> -->

    <!-- Echarts 图表 -->
    <el-row :gutter="10" class="mt-3">
      <el-col :xs="36" :sm="18" :lg="12" class="mb-2">
        <StatusPieChart
          id="pieChart1"
          height="300px"
          width="100%"
          class="bg-[var(--el-bg-color-overlay)]"
        />
      </el-col>
      <!-- <el-col :xs="36" :sm="18" :lg="12" class="mb-2">
        <TypePieChart
          id="pieChart2"
          height="300px"
          width="100%"
          class="bg-[var(--el-bg-color-overlay)]"
        />
      </el-col> -->
      <el-col :xs="36" :sm="18" :lg="12" class="mb-2">
        <BwList
          id="pieChart2"
          height="300px"
          width="100%"
          class="bg-[var(--el-bg-color-overlay)]"
        />
      </el-col>
      <!--  <el-col :xs="24" :sm="12" :lg="8" class="mb-2">
        <AlarmPieChart
          id="pieChart3"
          height="300px"
          width="100%"
          class="bg-[var(--el-bg-color-overlay)]"
        />
      </el-col>-->
      <!-- <el-col :xs="24" :sm="12" :lg="8" class="mb-2">
        <RadarChart
          id="radarChart"
          height="300px"
          width="100%"
          class="bg-[var(--el-bg-color-overlay)]"
        />
      </el-col> -->
    </el-row>
    <el-row :gutter="10" class="mt-3">
      <el-col :xs="24" :sm="12" :lg="24" class="mb-2">
        <TypePieChart
          id="pieChart3"
          height="300px"
          width="100%"
          class="bg-[var(--el-bg-color-overlay)]"
        />
      </el-col>
    </el-row>
    <!-- <el-row :gutter="10" class="mt-3">
      <el-col :xs="24" :sm="12" :lg="24" class="mb-2">
        <DataLineChart
          id="pieChart3"
          height="330px"
          width="100%"
          class="bg-[var(--el-bg-color-overlay)]"
        />
      </el-col>
    </el-row> -->
  </div>
</template>

<style lang="scss" scoped>
.dashboard-container {
  position: relative;
  padding: 24px;

  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .github-corner {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    border: 0;
  }

  .data-box {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    font-weight: bold;
    color: var(--el-text-color-regular);
    background: var(--el-bg-color-overlay);
    border-color: var(--el-border-color);
    box-shadow: var(--el-box-shadow-dark);
  }

  .svg-icon {
    fill: currentcolor !important;
  }
}
</style>
<!-- <template>
  <div class="content">
    <div class="main">
      <div id="chart1" class="chart"></div>
      <div id="chart2" class="chart"></div>
      <div id="chart3" class="chart"></div>
    </div>
    <div class="bottom">
      <div class="title">告警事件</div>
      <div id="chart3" class="line-chart">
        <div>
          <p>告警事件总数</p>
          <p>33</p>
        </div>
        <div>
          <p>已处理</p>
          <p>33</p>
        </div>
        <div>
          <p>未处理</p>
          <p>0</p>
        </div>
      </div>
    </div>
  </div>
</template> -->
<!-- <script setup>
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
// import api from "@/api/index";
import {
  getOnlineDeviceApi,
  getClassificationApi,
  getRecentDataApi,
} from "@/api/dashboard/index";
const isOnline = ref("");
const notOnline = ref("");
const DP = ref("");
const RR = ref("");
const ZZ = ref("");
const WQ = ref("");
const other = ref("");
const oneDay = ref("");
const threeDay = ref("");
const sevenDay = ref("");

onMounted(() => {
  // //获取设备在线状态数量
  getOnlineDeviceApi().then((res) => {
    isOnline.value = res.data.isOnline;
    notOnline.value = res.data.notOnline;
    var chartDom1 = document.getElementById("chart1");

    chartDom1.removeAttribute("_echarts_instance_");
    var myChart1 = echarts.init(chartDom1);
    var option1;
    option1 = {
      color: ["#009dff", "#22e4ff", "#3bffd0", "#04e38a", "#9dff86"],
      title: {
        text: "设备状态",
        left: "left",
        textStyle: {
          color: "#000",
        },
      },
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c} {d}%",
      },
      legend: {
        bottom: "5%",
        left: "center",
        textStyle: {
          color: "#000",
        },
      },
      series: [
        {
          type: "pie",
          radius: ["40%", "60%"],
          avoidLabelOverlap: false,
          label: {
            formatter: " {c}  ",
            textStyle: {
              color: "#000",
            },
          },

          data: [
            { value: isOnline.value, name: "在线" },
            { value: notOnline.value, name: "离线" },
          ],
        },
      ],
    };
    option1 && myChart1.setOption(option1);
  });

  //获取设备分类数量
  getClassificationApi().then((res) => {
    DP.value = res.data.DP;
    ZZ.value = res.data.ZZ;
    RR.value = res.data.RR;
    WQ.value = res.data.WQ;
    other.value = res.data.other;
    //设备分类数量
    var chartDom2 = document.getElementById("chart2");
    chartDom2.removeAttribute("_echarts_instance_");
    var myChart2 = echarts.init(chartDom2);
    var option2;
    option2 = {
      color: ["#009dff", "#22e4ff", "#3bffd0", "#04e38a", "#9dff86"],
      title: {
        text: "设备分类",
        left: "left",
        textStyle: {
          color: "#000",
        },
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        bottom: "5%",
        left: "center",
        textStyle: {
          color: "#000",
        },
      },
      series: [
        {
          type: "pie",
          radius: "60%",
          label: {
            formatter: " {c}  ",
            textStyle: {
              color: "#000",
            },
            overflow: "none",
          },
          data: [
            { value: DP.value, name: "泵站" },
            { value: ZZ.value, name: "河道" },
            { value: WQ.value, name: "水质" },
            { value: RR.value, name: "水库" },
            { value: other.value, name: "其他" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
    option2 && myChart2.setOption(option2);
  });
  //获取上报数据数HJ212
  getRecentDataApi().then((res) => {
    // oneDay.value = res.data.data.one;
    // threeDay.value = res.data.data.three;
    // sevenDay.value = res.data.data.seven;
    oneDay.value = 10;
    threeDay.value = 33;
    sevenDay.value = 70;
    //上报数据数
    var chartDom3 = document.getElementById("chart3");
    chartDom3.removeAttribute("_echarts_instance_");
    var myChart3 = echarts.init(chartDom3);
    var option3;

    option3 = {
      color: ["#009dff"],
      title: {
        text: "上报数据",
        left: "left",
        textStyle: {
          color: "#000",
        },
      },
      legend: {
        bottom: "5%",
        left: "center",
        textStyle: {
          color: "#000",
        },
      },

      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "10%",
        right: "10%",
        bottom: "15%",
        containLabel: true,
      },

      xAxis: [
        {
          type: "category",
          data: ["前一天", "前三天", "前七天"],
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#000", //更改坐标轴文字颜色
              fontSize: 14, //更改坐标轴文字大小
            },
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          axisLabel: {
            show: true,
            textStyle: {
              color: "#000", //更改坐标轴文字颜色
              fontSize: 14, //更改坐标轴文字大小
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#315070", //更改坐标轴颜色
              type: "dashed",
            },
          },
        },
      ],
      series: [
        {
          name: "监测数据",
          type: "bar",
          barWidth: "60%",
          data: [oneDay.value, threeDay.value, sevenDay.value],
        },
      ],
    };
    // option3 = {
    //   title: {
    //     text: "设备数据",
    //     left: "left",
    //     textStyle: {
    //       color: "#fff",
    //     },
    //   },
    //   tooltip: {
    //     trigger: 'axis',
    //     axisPointer: {
    //       // Use axis to trigger tooltip
    //       type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
    //     }
    //   },
    //   legend: {
    //     top: "7%",
    //     left: "center",
    //     textStyle: {
    //       color: "#fff",
    //     },
    //   },
    //   grid: {
    //     left: '3%',
    //     right: '4%',
    //     bottom: '3%',
    //     containLabel: true
    //   },
    //   yAxis: {
    //     type: 'value',
    //     axisLabel: {
    //       show: true,
    //       textStyle: {
    //         color: "#fff", //更改坐标轴文字颜色
    //         fontSize: 14, //更改坐标轴文字大小
    //       },
    //     },
    //   },
    //   xAxis: {
    //     type: 'category',
    //     data: ["前一天", "前三天", "前七天"],
    //     axisLabel: {
    //       show: true,
    //       textStyle: {
    //         color: "#fff", //更改坐标轴文字颜色
    //         fontSize: 14, //更改坐标轴文字大小
    //       },
    //     },
    //   },
    //   series: [
    //     {
    //       name: '水质',
    //       type: 'bar',
    //       stack: 'total',
    //       label: {
    //         show: true
    //       },
    //       emphasis: {
    //         focus: 'series'
    //       },
    //       data: [320, 302, 301, 334, 390, 330, 320],
    //     },
    //     {
    //       name: '雨量',
    //       type: 'bar',
    //       stack: 'total',
    //       label: {
    //         show: true,
    //         textStyle: {
    //           color: "#fff",
    //         },
    //       },
    //       emphasis: {
    //         focus: 'series'
    //       },
    //       data: [120, 132, 101, 134, 90, 230, 210]
    //     },
    //     {
    //       name: '河道水情',
    //       type: 'bar',
    //       stack: 'total',
    //       label: {
    //         show: true
    //       },
    //       emphasis: {
    //         focus: 'series'
    //       },
    //       data: [220, 182, 191, 234, 290, 330, 310]
    //     },
    //     {
    //       name: '闸门工情',
    //       type: 'bar',
    //       stack: 'total',
    //       label: {
    //         show: true,
    //       },
    //       emphasis: {
    //         focus: 'series'
    //       },
    //       data: [150, 212, 201, 154, 190, 330, 410]
    //     }
    //   ]
    // };
    option3 && myChart3.setOption(option3);
  });

  // 折线图
});
</script>
<style lang="scss" scoped>
@import "@/assets/css/index.scss";

.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: $bg;
  .title {
    font-weight: 700;
    font-size: 20px;
    margin-top: 50px;
    text-align: center;
  }
}

.main {
  padding-top: 20px;
  width: 80%;
  height: 350px;
  display: flex;
  justify-content: space-between;

  .chart {
    width: 30%;
    height: 100%;
    color: $fontBlack;
    background-color: $cardBg;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    padding: 10px 0 0 10px;
  }
}

.bottom {
  width: 60%;
  height: 380px;
  background-color: red;
  border-radius: 5px;
  background-color: $cardBg;
  margin-bottom: 50px;

  .line-chart {
    display: flex;
    justify-content: space-evenly;
    margin-left: 25px;
    height: 50%;

    > div {
      margin-top: 50px;
      width: 35%;
      height: 100%;
      background-image: url("@/assets/img/bg-circle.png");
      background-position: center;
      background-repeat: no-repeat;
      background-size: 70% 100%;

      > p {
        margin-right: 50px;
        margin-top: 30px;
        text-align: center;
        font-size: 18px;
        width: 100%;
      }
    }
  }
}
</style> -->
