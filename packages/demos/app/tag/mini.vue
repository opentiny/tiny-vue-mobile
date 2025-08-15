<template>
  <div class="tiny-tag-demo">
    <tiny-tag color="default"> 默认 </tiny-tag>
    <br/>
    <tiny-tag color="default" mini> 小尺寸 </tiny-tag>
  </div>
</template>

<script setup lang="ts">
import { TinyTag } from '@opentiny/vue-mobile'
</script>

<style>
.tiny-tag-demo {
  padding: 10px;
}

.tiny-mobile-tag {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
