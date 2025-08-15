<template>
  <div class="tiny-tag-demo">
    <tiny-tag color="default" :style="styleObj"> 标签一 </tiny-tag>
    <br/>
    <tiny-tag color="default" :style="styleObj2"> 标签二 </tiny-tag>
    <br/>
    <tiny-tag color="default" :style="styleObj3"> 标签二 </tiny-tag>
  </div>
</template>

<script setup lang="ts">
import { TinyTag } from '@opentiny/vue-mobile'

const styleObj = {
  color: '#1476ff',
  backgroundColor: '#deecff',
  border: '1px solid #deecff'
}

const styleObj2 = {
  color: '#1476ff',
  backgroundColor: 'transparent',
  border: '1px solid #1476ff'
}

const styleObj3 = {
  color: '#fff',
  backgroundColor: '#1476ff',
  border: '1px solid #1476ff'
}
</script>

<style>
.tiny-tag-demo {
  padding: 10px;
}
</style>
