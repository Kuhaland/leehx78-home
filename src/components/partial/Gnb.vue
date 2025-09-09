<template>
  <header ref="gnbRef">
    <h1>Leehx78</h1>
    <div class="header-item">
      <template v-for="(item, idx) in gnbContent">
        <router-link :to="item.link">{{ item.title }}</router-link>
        <span class="header-item-gap" v-if="idx < gnbContent.length - 1"></span>
      </template>
    </div>
  </header>
</template>
<script>
export default {
  name: 'Gnb',
}
</script>
<script setup>
import { onMounted, ref, nextTick } from "vue";
import { gsap } from 'gsap';

const gnbContent = ref([
  {title: 'Test1', link: '/dev/SampleScroll'},
  {title: 'Test2', link: '/dev/SampleTextSplit'},
])

const gnbRef = ref(null);

onMounted(async () => {
  await nextTick();

  gsap.set(gnbRef.value, { opacity: 0 });
  gsap.set(gnbRef.value.querySelector('h1'), { x: -50, opacity: 0 });
  gsap.set(gnbRef.value.querySelectorAll('a, .header-item-gap'), { x: 50, opacity: 0 });

  const tl = gsap.timeline({ delay: 1.2 });

  tl.to(gnbRef.value, { opacity: 1, duration: 0.2 })
      .to(gnbRef.value.querySelector('h1'), {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out'
      }, "<")
      .to(gnbRef.value.querySelectorAll('a, .header-item-gap'), {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.2
      }, "<0.3");
});
</script>
<style lang="scss" scoped>
@use '@/assets/scss/variable' as *;
header {
  position: fixed; z-index: 3;
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; height: 7rem; padding: 0 5%;
  font-size: clamp(0.66rem, 2vw, 1rem); letter-spacing: -0.05rem;
  h1 {font-size: font-size(26); font-weight: 700; color: color(white); }
  .header-item {
    display: flex; align-items: center;
    a { font-size: font-size(22); color: color(white);}
    &-gap {
      width: 0.1rem; height: 1.6rem; margin: 0 1.2rem 0 0.8rem;
      background-color: color(white); align-self: center;
    }
  }
}
</style>
