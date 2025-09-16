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
onMounted(() => {
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
  display: flex; justify-content: center; align-items: center; background-color: color(grey-700);
  width: 100%; height: 100vh;
  font-size: clamp(10rem, 8vw, 120rem); font-weight: 700; color: color(white);
}
</style>
