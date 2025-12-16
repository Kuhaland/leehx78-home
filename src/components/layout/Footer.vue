<template>
  <!-- Bottom Navigation -->
  <bottom-navi ref="naviRef"/>
  <!-- Footer -->
  <footer ref="footerRef" class="layout-footer">
    <div class="layout-footer-logo" ref="logoRef">{{ footerTitle }}</div>
    <div class="layout-footer-copy" ref="copyRef">&copy; {{ year }} by {{ gp.mainTitle }}</div>
  </footer>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, inject, watch } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BottomNavi from "@/components/unit/BottomNavi.vue";

defineOptions({ name: "Footer" });

gsap.registerPlugin(ScrollTrigger);

const gp = inject("$gp");
const footerRef = ref(null);
const logoRef = ref(null);
const copyRef = ref(null);
const naviRef = ref(null);

const today = new Date();
const year = today.getFullYear();
const footerTitle = 'Footer';
const footerProgress = ref(0);

let st;
onMounted(async () => {
  await document.fonts.ready;

  gsap.set(logoRef.value, { x: -100, opacity: 0 });
  gsap.set(copyRef.value, { x: 100, opacity: 0 });

  gsap.timeline({
    scrollTrigger: {
      trigger: footerRef.value,
      start: "top bottom",
      toggleActions: "play none none none",
    }
  })
      .to(logoRef.value, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
      .to(copyRef.value, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.4");

  st = ScrollTrigger.create({
    trigger: footerRef.value,
    start: "top bottom",
    end: "top+=120 bottom",
    scrub: true,
    onUpdate: (self) => {
      footerProgress.value = self.progress;
    }
  });

  ScrollTrigger.refresh();
});

onBeforeUnmount(() => {
  if (st) st.kill();
});

watch(footerProgress, (val) => {
  if (!naviRef.value) return;
  if (val >= 1) {
    gsap.to(naviRef.value.$el, {
      y: 100,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in"
    });
  } else {
    gsap.to(naviRef.value.$el, {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out"
    });
  }
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variable' as *;

.layout-footer {
  position: relative; z-index: 10; display: flex; justify-content: space-between; align-items: center;
  padding: clamp(1rem, 5vw, 4rem); font-size: 1.4rem; background-color: color(grey-900);
  color: color(grey-500);
  &-logo { font-size: clamp(2rem, 2vw, 2.8rem); font-weight: 700; }
  &-copy { font-size: clamp(1.3rem, 2vw, 1.6rem); font-weight: 300; text-align: right; letter-spacing: -0.1px;}
}
</style>
