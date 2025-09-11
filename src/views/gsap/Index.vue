<template>
  <gnb :delay="0.5"/>
  <div class="sample-container">
    GSAP
  </div>
  <bottom-navi/>
</template>
<script>
export default {
  name: 'Index',
};
</script>
<script setup>
import BottomNavi from "@/components/unit/BottomNavi.vue";
import Gnb from "@/components/partial/Gnb.vue";

</script>
<style lang="scss" scoped>
@use '@/assets/scss/variable' as *;
.sample-container {
  display: flex; justify-content: center; align-items: center; background-color: color(grey-700);
  width: 100%; height: 100vh;
  font-size: font-size(120); font-weight: 700; color: color(white);
}
</style>
