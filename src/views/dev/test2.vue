<template>
  <div class="layout-column-">
    <h2>Scroll down</h2>

    <div class="box"></div>

    <div class="box"></div>

    <div class="box"></div>
  </div>
</template>
<script>
export default {
  name: 'Test2',
};
</script>
<script setup>
import { onMounted } from "vue";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  const boxes = gsap.utils.toArray('.box');
  boxes.forEach(box => {
    gsap.to(box, {
      x: 300,
      scrollTrigger: {
        trigger: box,
        scrub: true,
        start: "top bottom",
        end: "bottom top"
      }
    })
  });
});
</script>

<style lang="scss" scoped>
h2, .box {margin-bottom: 100vh;}
h2 {padding-top: 30px; font-size: 30px; font-weight: 700; text-align: center;}
.box {display: inline-block; width: 100px; height: 100px; background-color: green;}
</style>
