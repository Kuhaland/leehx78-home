<template>
  <div class="btn-back" @click="goBack">뒤로</div>
</template>
<script>
export default {
  name: 'BottomNavi'
}
</script>
<script setup>
const goBack = () => {
  history.back();
}
</script>
<style lang="scss" scoped>
@use '@/assets/scss/variable' as *;
.btn-back {
  position: fixed; bottom: 20px; left: 20px; z-index: 10;
  display: inline-flex; justify-content: center; align-items: center;
  width: 60px; height: 60px; background-color: rgba(0,0,0,0.5); border-radius: 50%;
  color: $color-white; cursor: pointer;
}
</style>
