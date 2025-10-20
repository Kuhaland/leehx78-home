<template>
  <!-- Header -->
  <Header :delay="0.5"/>
  <!-- Content -->
  <div class="sample-container overflow-h">
    <span ref="gsapRef">GSAP</span>
  </div>
  <!-- Footer -->
  <Footer/>
</template>
<script setup>
import {onMounted, onUnmounted, ref} from 'vue';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";

defineOptions({ name: "Index" });

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

onMounted(() => {
  document.body.classList.add("overflow-h");
});

onUnmounted(() => {
  document.body.classList.remove("overflow-h");
});
</script>
<style lang="scss" scoped>
@use '@/assets/scss/variable' as *;
.sample-container {
  display: flex; justify-content: center; align-items: center;
  width: 100%; height: 100%;
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
