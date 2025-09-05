<template>
  <h2>Scroll Down</h2>
  <div class="flex-column- page-container bg-grey700">
    <div class="box-group">
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
    </div>
  </div>
  <bottom-navi/>
</template>
<script>
export default {
  name: 'Test1',
};
</script>
<script setup>
import { onMounted } from "vue";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BottomNavi from "@/components/unit/BottomNavi.vue";
gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  const boxes = gsap.utils.toArray('.box');
  boxes.forEach(box => {
    gsap.to(box, {
      x: 1000,
      scrollTrigger: {
        trigger: box,
        scrub: true,
        start: "top bottom",
        end: "bottom top"
      }
    })
  });

  gsap.from('.page-container', {
    opacity: 0,
    x: 1000,
    duration: 0.6,
    ease: 'power2.out'
  });
});

const back = () => {
  history.back();
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variable' as *;
h2 {
  position: fixed; top: 20px; left: 50%; z-index: 1;
  padding-top: 30px; font-size: 30px; font-weight: 700; color: $color-white; text-align: center;
  transform: translateX(-50%);
}
.box-group{
  display: flex; flex-direction: column; padding-top: 100vh;
  .box {display: inline-block; width: 100px; height: 100px; margin-bottom: 100vh; background-color: green;}
}
</style>
