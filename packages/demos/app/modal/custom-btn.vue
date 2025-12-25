<template>
  <div class="content">
    <tiny-button @click="value1 = !value1" :reset-time="0">自定义底部按钮内容</tiny-button>
    <tiny-modal 
      v-model="value1" 
      type="confirm" 
      show-footer
      :confirm-content="'OK'"
      :cancel-content="'你好'"
    >
    </tiny-modal>
  </div>
</template>

<script setup lang="jsx">
import { ref } from 'vue'
import { TinyButton, TinyModal } from '@opentiny/vue-mobile'

const value1 = ref(false)
</script>
