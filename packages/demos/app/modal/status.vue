<template>
  <div class="content">
    <tiny-button @click="baseClick" :reset-time="0">基本提示图标</tiny-button>
    <tiny-button @click="successClick" :reset-time="0">成功提示图标</tiny-button>
    <tiny-button @click="warningClick" :reset-time="0">警告提示图标</tiny-button>
    <tiny-button @click="errorClick" :reset-time="0">错误提示图标</tiny-button>
    <tiny-button @click="loadingClick" :reset-time="0">加载提示图标</tiny-button>
  </div>
  <div class="content">
    <p>标签提示图标</p>
    <tiny-button @click="value1 = !value1" :reset-time="0">点击~</tiny-button>
    <tiny-modal 
      v-model="value1" 
      type="confirm" 
      show-footer
      status="success"
    >
      自定义内容
    </tiny-modal>
  </div>
</template>

<script setup lang="jsx">
import { ref } from 'vue'
import { TinyButton, TinyModal } from '@opentiny/vue-mobile'

const value1 = ref(false)

function baseClick() {
  TinyModal.message({ message: '基本提示图标', status: 'info' })
}

function successClick() {
  TinyModal.message({ message: '成功提示图标', status: 'success' })
}

function warningClick() {
  TinyModal.message({ message: '警告提示图标', status: 'warning' })
}

function errorClick() {
  TinyModal.message({ message: '错误提示图标', status: 'error' })
}

function loadingClick() {
  TinyModal.message({ message: '加载提示图标', status: 'loading' })
}
</script>
