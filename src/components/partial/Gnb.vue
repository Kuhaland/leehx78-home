<template>
  <header ref="gnbRef">
    <h1 ref="logoEl"
        @click="goHome"
        @mouseenter="onHover"
        @mouseleave="onLeave"
    >
      {{ logoText }}
    </h1>
    <div class="header-title" v-if="props.title && isWide">{{ props.title }}</div>
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
import { onMounted, onBeforeUnmount, ref, nextTick } from "vue";
import { useRouter } from "vue-router";
import { gsap } from 'gsap';

const router = useRouter();

const props = defineProps({
  delay: {type: Number, default: 1.2,},
  title: {type: String, default: ''}
})

const logoText = ref('LEEHX78');
const logoEl = ref(null);
if (location.pathname.startsWith('/gsap')) {
  logoText.value = 'GSAP';
}

const goHome = () => {
  if (location.pathname.startsWith('/gsap')) {
    router.push('/');
  } else {
    location.reload();
  }
};
const onHover = () => {
  gsap.to(logoEl.value, {
    opacity: 0,
    scale: 1.1,
    duration: 0.2,
    ease: 'power1.out',
    onComplete: () => {
      logoText.value = location.pathname.startsWith('/gsap') ? '홈' : '새로고침';
      gsap.to(logoEl.value, {
        opacity: 1,
        duration: 0.3,
        ease: 'power1.out',
      });
    }
  });
};
const onLeave = () => {
  gsap.to(logoEl.value, {
    opacity: 0,
    scale: 1,
    duration: 0.2,
    ease: 'power1.in',
    onComplete: () => {
      logoText.value = 'SAMPLE';
      gsap.to(logoEl.value, {
        opacity: 1,
        duration: 0.3,
        ease: 'power1.in',
      });
    }
  });
}

const gnbContent = ref([]);
if (location.pathname.startsWith('/gsap')) {
  gnbContent.value = [
    { title: 'ScrollTrigger', link: '/gsap/SampleScroll' },
    { title: 'Observer', link: '/gsap/SampleObserver' },
    { title: 'TextSplit', link: '/gsap/SampleTextSplit' },
  ];
} else {
  gnbContent.value = [
    { title: 'GSAP', link: '/gsap/Index' },
  ];
}

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

const isWide = ref(window.innerWidth > 1200);

const handleResize = () => {
  isWide.value = window.innerWidth > 1200;
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>
<style lang="scss" scoped>
@use '@/assets/scss/variable' as *;

header {
  position: fixed; top: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; height: 10rem; padding: 0 clamp(1rem, 5vw, 4rem);
  h1 {
    display: inline-flex; width: 130px; justify-content: center; align-items: center;
    font-size: font-size(26); font-weight: 600; color: color(grey-100); letter-spacing: -0.05rem;
    &:hover { cursor: pointer;}
  }
  .header-title {
    position: absolute; left: 50%;
    font-size: font-size(50); font-weight: 200; color: color(grey-100); text-transform: uppercase;
    transform: translateX(-50%);
  }
  .header-item {
    display: flex; align-items: center;
    a { font-family: 'Spoqa Han Sans Neo', sans-serif; font-size: font-size(18); color: color(grey-100); letter-spacing: -0.01rem;}
    &-gap {
      width: 0.1rem; height: 1.6rem; margin: 0.2rem 1.2rem 0 1.2rem;
      background-color: color(grey-400); align-self: center;
    }
  }
}
</style>
