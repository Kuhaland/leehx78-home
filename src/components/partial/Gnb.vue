<template>
  <header ref="gnbRef">
    <h1>Leehx78</h1>
    <div class="header-title" v-if="props.title">{{ props.title }}</div>
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

const props = defineProps({
  delay: {type: Number, default: 1.2,},
  title: {type: String, default: ''}
})

const gnbContent = ref([
  {title: 'Home', link: '/'},
  {title: 'Scroll', link: '/gsap/SampleScroll'},
  {title: 'TextSplit', link: '/gsap/SampleTextSplit'},
])

const gnbRef = ref(null);

onMounted(async () => {
  await nextTick();

  gsap.set(gnbRef.value, { opacity: 0 });
  gsap.set(gnbRef.value.querySelector('h1'), { x: -50, opacity: 0 });

  const titleEl = gnbRef.value.querySelector('.header-title');
  if (titleEl) {
    gsap.set(titleEl, { y: -50, opacity: 0 });
  }

  gsap.set(gnbRef.value.querySelectorAll('a, .header-item-gap'), { x: 50, opacity: 0 });

  const tl = gsap.timeline({ delay: props.delay });

  tl.to(gnbRef.value, { opacity: 1, duration: 0.2 })
      .to(gnbRef.value.querySelector('h1'), {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out'
      }, "<");

  if (titleEl) {
    tl.to(titleEl, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power2.out'
    }, "<");
  }

  tl.to(gnbRef.value.querySelectorAll('a, .header-item-gap'), {
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
  position: fixed; top: 0; z-index: 3;
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; height: 10rem; padding: 0 5%;
  font-size: clamp(0.66rem, 2vw, 1rem); letter-spacing: -0.05rem;
  h1 {font-size: font-size(26); font-weight: 700; color: color(grey-100); }
  .header-title {
    position: absolute; left: 50%;
    font-size: font-size(50); font-weight: 700; color: color(grey-100);
    transform: translateX(-50%);
  }
  .header-item {
    display: flex; align-items: center;
    a { font-size: font-size(18); color: color(grey-100);}
    &-gap {
      width: 0.1rem; height: 1.6rem; margin: 0.2rem 1.2rem 0 1.2rem;
      background-color: color(grey-400); align-self: center;
    }
  }
}
</style>
