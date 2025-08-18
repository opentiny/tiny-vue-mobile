<template>
  <div class="tiny-mobile-action-sheet-demo">
    <tiny-button @click="fn">click me!</tiny-button>
    <tiny-action-sheet
      :visible="boxVisibility"
      @update:visible="boxVisibility = $event"
      @cancel="cancelFn"
      @confirm="confirmFn"
    >
      <template #content>
        <div style="height: 300px;padding: 20px;">
          <span>标题</span>
          <div>1234</div>
        </div>
      </template>
    </tiny-action-sheet>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { TinyActionSheet, TinyButton } from '@opentiny/vue-mobile'

const activeName = ref('')
const boxVisibility = ref(false)

function cancelFn() {
  console.log('取消')
}

function confirmFn(msg) {
  console.log('确定:', msg)
}

function fn() {
  boxVisibility.value = true
}

</script>

<style>
.page__hd {
  padding: 40px;
}
.page__desc {
  margin-top: 5px;
  color: #888;
  font-size: 14px;
  text-align: left;
}
</style>
