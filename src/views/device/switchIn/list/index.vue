<template>
  <div class="app-container">
    <div class="main">
      <!-- 搜索条件 -->
      <div class="condition">
        <div class="check2">
          <div class="type" style="border: none">服务器状态:</div>
          <div class="type1">
            <div
              class="statusPoint"
              :style="{ backgroundColor: getBgColor() }"
            ></div>
          </div>

          <div>
            {{
              serverStatus == 1
                ? "已连接"
                : serverStatus == 2
                ? "未连接"
                : serverStatus == 3
                ? "平台异常"
                : "未知错误"
            }}
          </div>
        </div>
        <div class="check2">
          <div class="type">主机名称</div>
          <el-input
            class="input"
            v-model="inputName"
            placeholder="请输入内容"
            clearable
          />
        </div>
        <div class="check2">
          <div class="type">所属站点</div>
          <el-select
            v-model="siteValue"
            class="m-3"
            placeholder="请选择站点"
            clearable
          >
            <el-option
              v-for="item in ownSiteList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="check2 small">
          <div class="type">在线状态</div>
          <el-select
            v-model="statusValue"
            class="m-3"
            placeholder="（全部）"
            clearable
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="check2">
          <div class="type">主机类型</div>
          <el-select
            v-model="typeValue"
            class="m-3"
            placeholder="（全部）"
            clearable
          >
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </div>
        <div class="btns">
          <el-button type="primary" class="btn" @click="getHostList()"
            >搜索</el-button
          >
          <el-button class="btn1" @click="reset()">重置</el-button>
        </div>
      </div>
      <div class="btns">
        <el-button type="primary" class="btn" @click="handleAddHost()"
          >新增主机</el-button
        >
        <el-button class="btn1" type="success" @click="handleSyncHost()"
          >同步视图</el-button
        >
      </div>
      <!-- 表格 -->
      <div class="table">
        <el-table
          :data="tableData"
          highlight-current-row
          height="550px"
          border
          empty-text="--"
          style="width: 98%; margin-top: 10px"
          @select="select"
          @select-all="selectAll"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column type="index" width="50" />
          <el-table-column
            align="center"
            prop="name"
            label="主机名称"
            width="120"
          />
          <el-table-column align="center" prop="deviceKey" label="主机序列号" />
          <el-table-column
            align="center"
            prop="deviceType"
            label="主机类型"
            width="150"
          />
          <el-table-column align="center" prop="stId" label="所属站点" />
          <el-table-column
            align="center"
            prop="isOnline"
            label="在线状态"
            width="120"
            :sortable="true"
            :sort-method="sortState"
          >
            <template #default="scope">
              <div class="text">
                <div
                  :class="{
                    'online-on': scope.row.isOnline == 1,
                    'online-off': scope.row.isOnline == 0,
                  }"
                ></div>
                <div style="margin-left: 10px">
                  {{ scope.row.isOnline == 0 ? "离线" : "在线" }}
                </div>
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column
            align="center"
            prop="sync"
            label="同步主机信息"
            width="100"
          /> -->
          <el-table-column
            align="center"
            prop="lastLoginTime"
            label="最后登录时间"
            width="140"
          />
          <el-table-column
            align="center"
            prop="offlineTime"
            label="离线时间"
            width="140"
          />
          <el-table-column
            align="center"
            prop="lastLoginIp"
            label="最近访问IP"
          />
          <el-table-column align="center" prop="remark" label="备注" />
          <el-table-column align="center" label="操作" width="350">
            <template #default="scope">
              <el-button
                link
                type="primary"
                size="small"
                @click="handleDetail(scope.row)"
                >查看</el-button
              >
              <el-button
                link
                type="warning"
                size="small"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                link
                type="success"
                size="small"
                @click="editView(scope.$index, scope.row)"
                >编辑视图</el-button
              >
              <el-button
                link
                type="danger"
                size="small"
                @click="hanldeDel(scope.$index, scope.row)"
                >删除</el-button
              >
              <!-- <el-button
                link
                type="warning"
                size="small"
                @click="handleControl(scope.row)"
                >控制面板</el-button
              > -->
              <!-- <el-button
                link
                type="success"
                size="small"
                @click="syncHost(scope.row)"
                >同步</el-button
              > -->
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40, 50, 100]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalSize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>

      <!-- 弹出框 -->
      <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        width="30%"
        :close-on-click-modal="false"
        :before-close="handleClose"
      >
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item required class="inp" label="主机名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入" clearable />
          </el-form-item>
          <el-form-item
            v-if="dialogTitle == '修改'"
            class="inp"
            label="主机ID"
            prop="id"
          >
            <el-input
              disabled
              v-model="form.id"
              placeholder="请输入"
              clearable
            />
          </el-form-item>
          <el-form-item
            v-if="dialogTitle == '新增'"
            class="inp"
            label="主机类型"
            prop="deviceType"
          >
            <el-select
              v-model="form.deviceType"
              class="m-3"
              placeholder="（全部）"
              clearable
            >
              <el-option
                v-for="item in typeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="dialogTitle == '新增'"
            class="inp"
            label="主机序列号"
            prop="deviceKey"
          >
            <el-input v-model="form.deviceKey" placeholder="请输入" clearable />
          </el-form-item>
          <el-form-item label="所属站点">
            <el-select v-model="form.stId" class="m-3" placeholder="请选择站点">
              <el-option
                v-for="item in ownSiteList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item class="note" label="备注">
            <el-input v-model="form.remark" placeholder="请输入" clearable />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose()">取 消</el-button>
          <el-button type="primary" @click="submitForm(form)">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 视图弹出框 -->
      <el-dialog
        :visible.sync="viewDialogVisible"
        width="90%"
        top="1vh"
        key="viewDialog"
        :close-on-click-modal="false"
        :before-close="handleCloseView"
      >
        <div style="height: 80vh">
          <iframe
            :src="viewUrl"
            frameborder="0"
            style="width: 100%; height: 80vh"
          ></iframe>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleCloseView()">{{ $t("h.cancel") }}</el-button>
          <el-button type="primary" @click="handleCloseView()">{{
            $t("h.determine")
          }}</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  queryAllTypes,
  queryHosts,
  editHost,
  queryDevices,
  syncHosts,
  getBrokerStatus,
  siteDetails,
  serviceControl,
  getEditHostURL,
  addHost,
  syncViewBatch,
} from "@/api/gateway/index.js";
import { queryAllSites } from "@/api/station/index.js";
export default {
  data() {
    return {
      small: false,
      disabled: false,
      background: true,
      formData: [],
      options: [
        {
          value: "2",
          label: "全部",
        },
        {
          value: "1",
          label: "在线",
        },
        {
          value: "0",
          label: "离线",
        },
      ],
      serverStatus: 3,
      siteValue: "",
      statusValue: "",
      typeValue: "",
      inputName: "",
      pageSize: 10,
      currentPage: 1,
      totalSize: 300,
      typeList: [],
      ownSiteList: [],
      sitesMap: {},
      dialogVisible: false,
      dialogTitle: "",
      tableData: [],
      chooseIds: [],
      ruleFormRef: {},
      ruleForm: {},
      form: {},
      viewDialogVisible: false,
      viewUrl: "",
      rules: {
        name: [
          { required: true, message: "请输入主机名称", trigger: "blur" },
          { min: 1, message: "请输入主机名称", trigger: "blur" },
        ],
      },
      syncHoststatus: [
        {
          value: 1,
          label: "已同步",
        },
        {
          value: 0,
          label: "未同步",
        },
        {
          value: 2,
          label: "同步失败",
        },
      ],
    };
  },
  created() {
    this.getServerStatus();
    this.getAllTypes();
    this.getAllSites();
    this.getHostList();
  },
  mounted() {
    // 添加socket通知监听
    window.addEventListener("onmessageWS", this.getSocketData);
  },
  methods: {
    // 获取emqx服务器状态
    getServerStatus() {
      getBrokerStatus().then((res) => {
        console.log(res);
        if (res.code == 0) {
          this.serverStatus = res.data.status;
        } else {
          this.$notify({
            type: "error",
            message: res.msg,
          });
        }
      });
    },
    sortState(a, b) {
      if (a.isOnline > b.isOnline) {
        return -1;
      }
    },
    getBgColor() {
      if (this.serverStatus == 1) {
        return "green";
      } else if (this.serverStatus == 2) {
        return "gray";
      } else if (this.serverStatus == 3) {
        return "black";
      } else {
        return "red";
      }
    },
    handleSizeChange(val) {
      console.log(`${val} items per page`);
      this.pageSize = val;
      this.currentPage = 1;
      this.getHostList();
    },
    handleCurrentChange(val) {
      console.log(`current page: ${val}`);
      this.currentPage = val;
      this.getHostList();
    },
    getAllTypes() {
      queryAllTypes().then((res) => {
        console.log("types", res);
        for (var i = 0; i < res.data.length; i++) {
          const obj = {};
          obj.id = res.data[i].id;
          obj.name = res.data[i].cnName;
          this.typeList.push(obj);
        }
        console.log("typelist", this.typeList);
      });
    },
    getAllSites() {
      queryAllSites().then((res) => {
        console.log("sites", res);
        for (var i = 0; i < res.data.length; i++) {
          let obj = {};
          obj.value = res.data[i].stId;
          obj.label = res.data[i].stName;
          this.ownSiteList.push(obj);
        }
        console.log("ownSiteList", this.ownSiteList);
        this.createValueLabelMap(this.ownSiteList);
      });
    },
    createValueLabelMap(data) {
      data.forEach((obj) => {
        this.sitesMap[obj.value] = obj.label;
      });
      console.log("sitesMap" + JSON.stringify(this.sitesMap));
    },
    //获取主机列表
    getHostList() {
      queryHosts({
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        deviceType: this.typeValue,
        name: this.inputName,
        isOnline: this.statusValue,
        stId: this.siteValue,
      }).then((res) => {
        console.log(res);
        if (res.data == null) {
          this.$notify({
            type: "error",
            message: res.msg,
          });
          this.tableData = [];
          return;
        }
        const temp = res.data.list;
        for (let i = 0; i < temp.length; i++) {
          for (let j = 0; j < this.typeList.length; j++) {
            if (this.typeList[j].id == temp[i].deviceType) {
              temp[i].deviceType = this.typeList[j].name;
              break;
            }
          }
          temp[i].stId = this.sitesMap[temp[i].stId];
          for (let j = 0; j < this.syncHoststatus.length; j++) {
            if (this.syncHoststatus[j].value == temp[i].sync) {
              temp[i].sync = this.syncHoststatus[j].label;
              break;
            }
          }
        }
        this.tableData = temp;
        this.totalSize = res.data.totalSize;
        console.log(this.tableData, this.totalSize);
      });
    },
    //选择主机
    select(selection, row) {
      console.log(selection, row.id);
      if (selection.length > 0) {
        this.chooseIds = selection.map((item) => item.id);
      } else {
        this.chooseIds = [];
      }
      console.log(this.chooseIds);
    },
    selectAll(selection) {
      console.log(selection);
      if (selection.length > 0) {
        this.chooseIds = selection.map((item) => item.id);
      } else {
        this.chooseIds = [];
      }
      console.log(this.chooseIds);
    },
    //同步主机视图
    handleSyncHost() {
      if (this.chooseIds.length > 0) {
        syncViewBatch(this.chooseIds).then((res) => {
          console.log(res);
          if (res.code == 0) {
            this.$notify({
              message: res.msg,
              type: "success",
              duration: 2000,
            });
          } else {
            this.$notify({
              message: res.msg,
              type: "warning",
              duration: 2000,
            });
          }
        });
      } else {
        this.$notify({
          message: "请选择主机",
          type: "warning",
          duration: 2000,
        });
      }
    },
    //新增主机
    handleAddHost() {
      this.dialogTitle = "新增";
      this.form = {};
      this.dialogVisible = true;
    },
    //修改
    handleEdit(index, row) {
      this.dialogTitle = "修改";
      this.form = row;
      this.dialogVisible = true;
    },
    //保存
    submitForm(form) {
      console.log(form);
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.dialogTitle == "新增") {
            const params = {
              name: form.name,
              deviceKey: form.deviceKey,
              deviceType: form.deviceType,
              stId: form.stId,
              remark: form.remark || "",
            };
            addHost(params)
              .then((res) => {
                console.log(res);
                if (res.code == 0) {
                  this.$notify({
                    message: res.msg,
                    type: "success",
                    duration: 2000,
                  });
                } else {
                  this.$notify({
                    message: res.msg,
                    type: "warning",
                    duration: 2000,
                  });
                }
              })
              .finally(() => {
                this.dialogVisible = false;
                this.getHostList();
              });
          }
          if (this.dialogTitle == "修改") {
            this.form.deviceType = this.typeList.find(
              (item) => item.name == form.deviceType
            ).id;
            console.log(form.stId);
            this.form.stId = this.ownSiteList.find(
              (item) => item.label == form.stId
            ).value;
            editHost(this.form)
              .then((res) => {
                console.log(res);
                if (res.code == 0) {
                  this.$notify({
                    message: res.msg,
                    type: "success",
                    duration: 2000,
                  });
                } else {
                  this.$notify({
                    message: res.msg,
                    type: "warning",
                    duration: 2000,
                  });
                }
              })
              .finally(() => {
                this.dialogVisible = false;
                this.getHostList();
              });
          }
        } else {
          console.log("error submit!!");
        }
      });
    },
    // 关闭弹窗
    handleClose() {
      this.getHostList();
      this.dialogVisible = false;
    },
    // 重置
    reset() {
      this.inputName = "";
      this.siteValue = "";
      this.statusValue = "";
      this.typeValue = "";
      this.getHostList();
    },
    // 同步主机信息
    syncHost(row) {
      const params = {
        params: null,
      };
      console.log(row.id);
      syncHosts(row.id, params)
        .then((res) => {
          console.log(res);
          if (res.code == 0) {
            row.sync = this.syncHoststatus.find(
              (item) => item.value == 1
            ).label;
            this.$notify({
              message: res.msg,
              type: "success",
              duration: 2000,
            });
          } else {
            this.$notify({
              message: res.msg,
              type: "warning",
              duration: 2000,
            });
            row.sync = this.syncHoststatus.find(
              (item) => item.value == 2
            ).label;
          }
        })
        .finally(() => {
          this.getHostList();
        });
    },
    // 接收到消息的回调函数
    getSocketData(res) {
      console.log(res);
      let e = res.detail;
      if (e.data == "pong") {
        //心跳消息不做处理
        return;
      } else {
        let data = JSON.parse(e.data);
        console.log(data.type);
        if (data.type == "hjlcConnectOrDisconn") {
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].id == data.data.id) {
              this.tableData[i].isOnline = data.data.isOnline;
            }
          }
          this.$notify({
            message: data.data.name + (data.data.isOnline ? "连接" : "离线"),
            type: data.data.isOnline ? "success" : "error",
            duration: 2000,
          });
          return;
        }
        if (data.type == "mqttBrokerStatus") {
          this.serverStatus = data.data.status;
          this.$notify({
            message: "服务器已" + (data.data.status ? "连接" : "离线"),
            type: data.data.status == 1 ? "success" : "error",
            duration: 2000,
          });
          return;
        }
      }
    },
    // 跳转操作界面
    handleControl(row) {
      // if (row.isOnline == 1 && this.serverStatus == 1) {
      console.log(row);
      this.$router.push({
        name: "gateway/control",
        params: {
          id: row.id,
          ownSite: row.stId,
          name: row.name,
          isOnline: row.isOnline,
        },
      });
    },
    // 跳转详情界面
    handleDetail(row) {
      console.log(row);
      this.$router.push({
        path: "detail",
        query: {
          id: row.id,
          ownSite: row.stId,
          name: row.name,
          isOnline: row.isOnline,
        },
      });
    },
    //跳转视图页面
    editView(index, row) {
      console.log(index, row);

      getEditHostURL(row.id).then((res) => {
        if (res.code == 0) {
          this.viewUrl = res.data;
          this.viewDialogVisible = true;
        } else {
          this.$notify({
            message: res.msg,
            type: "warning",
            duration: 2000,
          });
        }
      });
    },
    // 关闭视图弹窗
    handleCloseView() {
      this.viewDialogVisible = false;
    },
    //删除
    handleDel(index, val) {
      console.log(val);
      this.$confirm(this.$t("h.del_determine"), this.$t("h.prompt"), {
        confirmButtonText: this.$t("h.determine"),
        cancelButtonText: this.$t("h.cancel"),
        type: "warning",
      })
        .then(() => {
          delDevice(this.id, val.id).then((res) => {
            console.log(res);
            if (res.code == 0) {
              this.$notify({
                type: "success",
                message: res.msg,
              });
              // this.getAllSites();
            } else {
              this.$notify({
                type: "error",
                message: res.msg,
              });
            }
          });
        })
        .catch(() => {
          this.$notify({
            type: "info",
            message: this.$t("h.del_cancel"),
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  margin: 0;
  background-color: #fff !important;
  padding: 10px;

  .condition {
    font-size: var(--font-medium);
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    line-height: 50px;
    margin-left: 30px;

    .check2 {
      width: 250px;
      display: flex;
      justify-content: flex-start;

      .type {
        text-align: center;
        width: 100px;
        height: 30px;
        line-height: 30px;
        margin-top: 10px;
      }
    }
    .btns {
      margin-top: 0px;
      height: 50px;
      width: 200px;
    }
  }
  .pagination {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
}
.statusPoint {
  width: 15px;
  height: 15px;
  border-radius: 50%;
}
.type1 {
  text-align: center;
  width: 20px;
  height: 30px;
  line-height: 30px;
  margin-top: 18px;
}
.online-on {
  width: 14px;
  height: 14px;
  background-color: #80ce72;
  border-radius: 50%;
}
.online-off {
  width: 14px;
  height: 14px;
  background-color: #aaaaaa;
  border-radius: 50%;
}
.text {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
