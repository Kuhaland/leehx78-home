<template>
  <gnb :delay="0.5"/>
  <div class="sample-container">
    <span ref="gsapRef">GSAP</span>
  </div>
  <bottom-navi/>
</template>
<script>
export default {
  name: 'Index',
};
</script>
<script setup>
import {onMounted, ref} from 'vue';
import { gsap } from 'gsap';
import BottomNavi from "@/components/unit/BottomNavi.vue";
import Gnb from "@/components/partial/Gnb.vue";
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText);

const gsapRef = ref(null);
onMounted(async () => {
  await document.fonts.ready;

  const split = new SplitText(gsapRef.value, { type: 'chars' });
  gsap.from(split.chars, {
    opacity: 0,
    y: -150,
    stagger: 0.05,
    ease: 'elastic.out',
    duration: 1.2,
  });
});

</script>
<style lang="scss" scoped>
@use '@/assets/scss/variable' as *;
.sample-container {
  display: flex; justify-content: center; align-items: center;
  width: 100%; height: 100vh; background-color: color(grey-700);
  span { position: relative; z-index: 10; font-size: clamp(10rem, 8vw, 120rem); font-weight: 700; color: color(white);}
  &:before{
    content:""; position: absolute; top: -200%; left: -50%; width: 220%; height: 220%;
    background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 40%; opacity: 0.8;
    animation: beforeRotate 40s linear infinite;
  }
  &:after{
    content:""; position: absolute; top: -180%; left: -30%; width: 210%; height: 210%;
    background-image: linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%);
    border-radius: 48%; opacity: 0.6;
    animation: beforeRotate 30s linear infinite;
  }
  @keyframes beforeRotate{
    0%{ transform:rotate(0deg);}
    100%{ transform:rotate(360deg);}
  }
}
</style>
