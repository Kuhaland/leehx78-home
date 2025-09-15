<template>
  <gnb :delay="0.5" title="Scroll"/>
  <div class="sample-container">
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
import { onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BottomNavi from "@/components/unit/BottomNavi.vue";
import Gnb from "@/components/partial/Gnb.vue";

gsap.registerPlugin(ScrollTrigger);

const route = useRoute();

const initScrollTrigger = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  ScrollTrigger.refresh();

  const boxes = gsap.utils.toArray('.box');
  boxes.forEach(box => {
    gsap.to(box, {
      x: 0,
      scrollTrigger: {
        trigger: box,
        scrub: true,
        start: "top bottom",
        end: "bottom top",
        markers: false,
      }
    });
  });

  gsap.from('.sample-container', {
    opacity: 0,
    x: 310,
    duration: 0.6,
    ease: 'power2.out'
  });
};

onMounted(async () => {
  await nextTick();
  initScrollTrigger();
});

watch(() => route.fullPath, async () => {
  await nextTick();
  initScrollTrigger();
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variable' as *;
.sample-container {
  display: flex; flex-direction: column; background-color: color(grey-700);
  .box-group{
    display: flex; flex-direction: column; padding-top: 100vh;
    .box {display: inline-block; width: 10.0rem; height: 10.0rem; margin-bottom: 100vh; background-color: green;}
  }
}
</style>
