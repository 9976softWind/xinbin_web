<template>
  <div class="modal" v-if="visible">
    <div class="modal-con">
      <div class="modal-tit">
        <span>修改</span>
        <span class="close" @click="$emit('close', false)">x</span>
      </div>
      <div class="body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
//接收父元素数据
export default {
  props: {
    visible: { type: Boolean, default: false },
  },
};
</script>
<style>
.modal {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
}
.modal-con {
  width: 300px;
  height: 300px;
  background-color: #fff;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  padding: 20px;
  border-radius: 20px;
}
.modal-tit {
  content: "";
  display: block;
  clear: both;
  margin-bottom: 10px;
}
.close {
  float: right;
  cursor: pointer;
}
</style>
