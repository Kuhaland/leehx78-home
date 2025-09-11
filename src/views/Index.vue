<template>
  <gnb :delay="0.5" title=""/>
  <div class="sample-container">
    <div class="box-group">
      <div class="box">1</div>
      <div class="box">2</div>
      <div class="box">3</div>
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
import Gnb from "@/components/partial/Gnb.vue";
gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  const boxes = gsap.utils.toArray('.box');
  boxes.forEach(box => {
    gsap.to(box, {
      x: 0,
      scrollTrigger: {
        trigger: box,
        scrub: true,
        start: "top bottom",
        end: "bottom top"
      }
    })
  });

  gsap.from('.sample-container', {
    opacity: 1,
    x: 0,
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
.sample-container {
  display: flex; flex-direction: column; background-color: color(grey-700);
  .box-group{
    display: flex; flex-direction: column;
    .box {
      display: flex; justify-content: center; align-items: center;
      width: 100%; height: 100vh; background-color: green;
      font-size: font-size(30); color: color(white);
    }
  }
}
</style>
