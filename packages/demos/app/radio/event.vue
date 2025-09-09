<template>
  <div class="demo">
    <p>默认</p>
    <tiny-radio v-model="value" label="1" @change="changeAction">男</tiny-radio>
    <tiny-radio v-model="value" label="2" @change="changeAction">女</tiny-radio>
    <p>{{ text }}</p>
    <br/> <br/>
    <tiny-checkbox-group v-model="checked" class="demo-checkbox-group">
      <tiny-checkbox label="复选框1">复选框1</tiny-checkbox>
      <tiny-checkbox label="复选框2">复选框2</tiny-checkbox>
    </tiny-checkbox-group>
    <p>当前选中的值为：{{ checked }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { TinyRadio, TinyCheckbox, TinyCheckboxGroup } from '@opentiny/vue-mobile'

const value = ref('1')
const text = ref('男')
const checked = ref(['复选框1'])


function changeAction(value) { // NISVUE3 FIXME: value重复定义，请手工修改
  text.value = value === '1' ? '男' : '女'
}
</script>

<style>
.demo-checkbox-group {
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  width: 200px;
}
.demo {
  height: 100%;
  overflow-y: auto;
  padding: 20px;
}
</style>
