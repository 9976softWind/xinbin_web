<template>
  <el-table
    v-loading="listLoading"
    :data="tableData"
    element-loading-text="Loading"
    fit
    border
    highlight-current-row
    :max-height="maxHeight"
  >
    <el-table-column
      v-for="(item, index) in tableHeader"
      :key="index"
      :prop="item.prop"
      align="left"
      :label="item.label"
      :min-width="item.minHeight"
      class="header"
    >
      <template #default="scope">
        <div v-if="item.btn">
          <!-- 操作栏的按钮判断 -->
          <el-button
            v-for="(k, index) in item.btn"
            :key="index"
            link
            size="small"
            @click="k.func(scope.$index, scope.row)"
            >{{ k.name }}</el-button
          >
        </div>
        <div v-else>
          <span v-if="!item.formatData">
            <!-- 日期拼接并且只显示年月日 -->
            <span v-if="item.isDate == true"
              >{{ repString(scope.row[item.prop[0]]) }}-{{
                repString(scope.row[item.prop[1]])
              }}</span
            >
            <span v-else>{{ scope.row[item.prop] }}</span>
          </span>
          <span v-else>
            <!--  //根据不同状态显示不同的文字颜色 -->
            <el-link
              v-if="item.isline == true"
              :type="item.lineType(scope.row[item.prop])"
              :underline="false"
              >{{ item.formatData(scope.row[item.prop]) }}</el-link
            >
            <span v-else>{{ scope.row[k.prop] }}</span>
          </span>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    tableHeader: {
      type: Array,
      default: () => [],
    },
    listLoading: {
      type: Boolean,
      default: false,
    },
    maxHeight: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    //对日期进行截取
    function repString(val) {
      return val.substr(0, 10);
    }
    return {
      repString,
    };
  },
};
</script>

<style>
.header {
  background-color: black;
}
</style>
