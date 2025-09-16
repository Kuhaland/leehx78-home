<template>
  <footer ref="footerRef" class="footer">
    <div class="footer-logo" ref="logoRef">Sample</div>
    <div class="footer-copy" ref="copyRef">&copy; {{ year }} Sample. All rights reserved.</div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<script setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const footerRef = ref(null);
const logoRef = ref(null);
const copyRef = ref(null);
const today = new Date();
const year = today.getFullYear();

onMounted(() => {
  gsap.set(logoRef.value, { x: -100, opacity: 0 });
  gsap.set(copyRef.value, { x: 100, opacity: 0 });

  ScrollTrigger.create({
    trigger: footerRef.value,
    start: "top bottom",
    marker: true,
    onEnter: (self) => {
      gsap.timeline()
          .to(logoRef.value, {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out"
          })
          .to(copyRef.value, {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out"
          }, "-=0.4")
      self.kill();
    },
  });
  ScrollTrigger.refresh();
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variable' as *;

.footer {
  position: relative; z-index: 10; display: flex; justify-content: space-between; align-items: center;
  padding: clamp(1rem, 5vw, 4rem); font-size: 1.4rem; background-color: color(grey-900);
  color: color(grey-500);
  &-logo { font-size: clamp(2rem, 2vw, 2.8rem); font-weight: 700; }
  &-copy { font-size: clamp(1.3rem, 2vw, 1.6rem); font-weight: 300; text-align: right; letter-spacing: -0.1px;}
}
</style>
