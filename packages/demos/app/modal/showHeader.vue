<template>
  <tiny-button @click="btnClick" :reset-time="0">不显示头部</tiny-button>
</template>

<script setup lang="jsx">
import { TinyButton, TinyModal } from '@opentiny/vue-mobile'

function btnClick() {
  TinyModal.alert({ message: '不显示头部', showHeader: false  })
}
</script>
