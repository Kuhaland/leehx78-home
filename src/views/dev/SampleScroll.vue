<template>
  <h2>Scroll Down</h2>
  <div class="flex-column- page-container bg-grey-700">
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
  name: 'SampleScroll',
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
  position: fixed; top: 2.0rem; left: 50%; z-index: 1;
  padding-top: 3.0rem; font-size: 3.0rem; font-weight: 700; color: color(white); text-align: center;
  transform: translateX(-50%);
}
.box-group{
  display: flex; flex-direction: column; padding-top: 100vh;
  .box {display: inline-block; width: 10.0rem; height: 10.0rem; margin-bottom: 100vh; background-color: green;}
}
</style>
