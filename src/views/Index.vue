<template>
  <div class="flex-column-20-20-20">
    <h1 class="fs-20 fw-700">Test List</h1>
    <ul class="flex-column-0-0-12">
      <li><router-link to="/dev/test1">- 테스트 1</router-link></li>
      <li><router-link to="/dev/test2">- 테스트 2</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Index',
};
</script>
<script setup>
</script>

<style lang="scss">
</style>
