<template>
  <div class="bottom-navi">
    <div class="btn-back" @click="goBack">
      <i class="ico-arrow-prev"/>
    </div>
    <div class="btn-reload" @click="reload">
      <i class="ico-reload" ref="reloadIcon"/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BottomNavi'
}
</script>
<script setup>
import {ref, onMounted} from "vue";
import { gsap } from "gsap";

const reloadIcon = ref(null);
const goBack = () => {
  history.back();
}
const reload = () => {
  gsap.to(reloadIcon.value, {
    rotation: 360,
    duration: 0.5,
    ease: "power1.inOut",
    onComplete: () => {
      location.reload();
    }
  });
};
</script>
<style lang="scss" scoped>
@use '@/assets/scss/variable' as *;
.bottom-navi {
  position: fixed; bottom: 20px; left: 20px; z-index: 10; display: flex; gap: 10px;
  [class^='btn-'] {
    display: inline-flex; justify-content: center; align-items: center;
    width: 60px; height: 60px; background-color: rgba(0,0,0,0.5); border-radius: 50%;
    color: $color-white; cursor: pointer;
  }
  [class^='ico-'] {filter: $ico-color-white; transform-origin: center;}
}
</style>
