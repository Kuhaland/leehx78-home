<template>
  <header>
    <h1>Leehx78</h1>
    <div class="flex-row-0-0-8">
      <div><router-link to="/dev/SampleScroll" class="fc-white fs-16">Test1</router-link></div>
      <div><router-link to="/dev/SampleTextSplit" class="fc-white fs-16">Test2</router-link></div>
    </div>
  </header>
</template>
<script>
export default {
  name: 'TopNavi',
}
</script>
<script setup>
</script>
<style lang="scss" scoped>
@use '@/assets/scss/variable'as *;

header {
  h1 {font-size: font-size(16); color: color(white);}
}
</style>
