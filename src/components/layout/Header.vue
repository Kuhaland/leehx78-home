<template>
  <header ref="gnbRef" class="layout-header">
    <h1 ref="logoEl"
        @click="goHome"
        @mouseenter="onHover"
        @mouseleave="onLeave"
        class="layout-header-logo"
    >
      {{ logoText }}
    </h1>
    <div class="layout-header-title" v-if="props.title && isWide">{{ props.title }}</div>
    <div class="layout-header-item">
      <template v-for="(item, idx) in gnbContent" :key="idx">
        <router-link :to="item.link"
                     class="layout-header-item-link"
                     @mouseenter="onItemHover($event)"
        >
          <span v-for="(char, i) in item.title.split('')" :key="i" class="char">
            {{ char }}
          </span>
        </router-link>
        <span class="layout-header-item-gap" v-if="idx < gnbContent.length - 1"></span>
      </template>
    </div>
  </header>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, nextTick, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { gsap } from 'gsap';

defineOptions({ name: "Header" });

const router = useRouter();
const route = useRoute();

const props = defineProps({
  delay: {type: Number, default: 1.2,},
  title: {type: String, default: ''}
})

const logoText = ref('LEEHX78');
const logoEl = ref(null);
if (location.pathname.startsWith('/gsap')) {
  logoText.value = 'GSAP';
}
console.log(router.getRoutes());
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
      logoText.value = 'LEEHX78';
      gsap.to(logoEl.value, {
        opacity: 1,
        duration: 0.3,
        ease: 'power1.in',
      });
    }
  });
}

const onItemHover = (e) => {
  const chars = e.currentTarget.querySelectorAll(".char");
  const staggerEach = 0.08;
  const upDuration = 0.1;
  const downDuration = 0.1;

  const tl = gsap.timeline();

  tl.to(chars, {
    y: -8,
    duration: upDuration,
    ease: "power2.out",
    stagger: { each: staggerEach }
  });
  tl.to(chars, {
    y: 0,
    duration: downDuration,
    ease: "power2.in",
    stagger: { each: staggerEach }
  }, `-=${chars.length * staggerEach - upDuration}`);
};

const gnbContent = ref([]);
const updateMenu = () => {
  if (route.path.startsWith("/gsap")) {
    logoText.value = "GSAP";
    gnbContent.value = [
      { title: "ScrollTrigger", link: "/gsap/SampleScroll" },
      { title: "Observer", link: "/gsap/SampleObserver" },
      { title: "TextSplit", link: "/gsap/SampleTextSplit" },
    ];
  } else {
    logoText.value = "LEEHX78";
    gnbContent.value = [
      { title: "GSAP", link: "/gsap" },
    ];
  }
};
updateMenu();
watch(() => route.path, () => {
  updateMenu();
});

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

.layout-header {
  position: fixed; top: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; height: 10rem; padding: 0 clamp(1rem, 5vw, 4rem);
  background-color: rgba(45,47,52,0.3);
  &-logo {
    display: inline-flex; width: 130px; justify-content: center; align-items: center;
    font-size: font-size(26); font-weight: 600; color: color(grey-100); letter-spacing: -0.05rem;
    &:hover { cursor: pointer;}
  }
  &-title {
    position: absolute; left: 50%;
    font-size: font-size(50); font-weight: 200; color: color(grey-100); text-transform: uppercase;
    transform: translateX(-50%);
  }
  &-item {
    display: flex; align-items: center;
    &-link {
      font-family: 'Spoqa Han Sans Neo', sans-serif; font-size: font-size(18); color: color(grey-100); letter-spacing: -0.01rem;
      .char { display: inline-block; pointer-events: none;}
    }
    &-gap {
      width: 0.1rem; height: 1.6rem; margin: 0.2rem 1.2rem 0 1.2rem;
      background-color: color(grey-400); align-self: center;
    }
  }
}
</style>
