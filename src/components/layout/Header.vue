<template>
  <header ref="gnbRef" class="layout-header">
    <h1
        ref="logoEl"
        @click="goHome"
        @mouseenter="onHover"
        @mouseleave="onLeave"
        class="layout-header-logo"
    >
      {{ logoText }}
    </h1>

    <div class="layout-header-title" v-if="props.title && isWide">
      {{ props.title }}
    </div>

    <div class="layout-header-item">
      <template v-for="(item, idx) in gnbContent" :key="idx">
        <router-link
            :to="item.link"
            class="layout-header-item-link"
            @mouseenter="onItemHover($event)"
        >
          <span
              v-for="(char, i) in item.title.split('')"
              :key="i"
              class="char"
          >
            {{ char }}
          </span>
        </router-link>

        <span
            class="layout-header-item-gap"
            v-if="idx < gnbContent.length - 1"
        ></span>
      </template>
    </div>
  </header>
</template>

<script setup>
import {
  onMounted,
  onBeforeUnmount,
  ref,
  nextTick,
  watch,
  computed
} from "vue";
import { useRouter, useRoute } from "vue-router";
import { gsap } from "gsap";

defineOptions({ name: "Header" });

const router = useRouter();
const route = useRoute();

const logoEl = ref(null);
const hoverText = ref(null);
const gnbRef = ref(null);

let ctx;

const props = defineProps({
  delay: { type: Number, default: 1.2 },
  title: { type: String, default: "" }
});

const logoText = computed(() => {
  if (hoverText.value) return hoverText.value;

  const path = route.path;

  if (path.startsWith("/test/gsap")) return "GSAP";
  if (path.startsWith("/test/weather")) return "Weather";
  if (path.startsWith("/test/subway")) return "Subway";

  return "Home";
});

const goHome = () => {
  router.push("/");
};

const onHover = () => {

  gsap.to(logoEl.value, {
    opacity: 0,
    scale: 1.1,
    duration: 0.2,
    ease: "power1.out",
    onComplete: () => {

      const isHomePath =
          route.path.startsWith("/test/gsap") ||
          route.path.startsWith("/test/weather") ||
          route.path.startsWith("/test/subway");

      hoverText.value = isHomePath ? "홈" : "새로고침";

      gsap.to(logoEl.value, {
        opacity: 1,
        duration: 0.3,
        ease: "power1.out"
      });
    }
  });
};

const onLeave = () => {
  gsap.to(logoEl.value, {
    opacity: 0,
    scale: 1,
    duration: 0.2,
    ease: "power1.in",
    onComplete: () => {

      hoverText.value = null;

      gsap.to(logoEl.value, {
        opacity: 1,
        duration: 0.3,
        ease: "power1.in"
      });
    }
  });
};

const onItemHover = (e) => {

  const chars = e.currentTarget.querySelectorAll(".char");

  const tl = gsap.timeline();

  tl.to(chars, {
    y: -8,
    duration: 0.1,
    ease: "power2.out",
    stagger: { each: 0.08 }
  });

  tl.to(chars, {
    y: 0,
    duration: 0.1,
    ease: "power2.in",
    stagger: { each: 0.08 }
  }, `-=${chars.length * 0.08 - 0.1}`);
};

const gnbContent = ref([]);

const updateMenu = () => {

  if (route.path.startsWith("/test/gsap")) {
    gnbContent.value = [
      { title: "ScrollTrigger", link: "/test/gsap/SampleScroll" },
      { title: "Observer", link: "/test/gsap/SampleObserver" },
      { title: "TextSplit", link: "/test/gsap/SampleTextSplit" },
      { title: "Sample", link: "/test/gsap/SampleAnimation" }
    ];
    return;
  }

  gnbContent.value = [
    { title: "Gsap", link: "/test/gsap" },
    { title: "Weather", link: "/test/weather" },
    { title: "Subway", link: "/test/subway" }
  ];
};

updateMenu();

watch(() => route.path, updateMenu);

onMounted(async () => {

  await nextTick();

  ctx = gsap.context(() => {

    if (!gnbRef.value) return;

    const h1 = gnbRef.value.querySelector("h1");
    const titleEl = gnbRef.value.querySelector(".header-title");

    const links = gsap.utils.toArray(
        gnbRef.value.querySelectorAll("a, .header-item-gap")
    );

    gsap.set(gnbRef.value, { opacity: 0 });

    if (h1) gsap.set(h1, { x: -50, opacity: 0 });

    if (titleEl) {
      gsap.set(titleEl, { y: -50, opacity: 0 });
    }

    if (links.length) {
      gsap.set(links, { x: 50, opacity: 0 });
    }

    const tl = gsap.timeline({ delay: props.delay });

    tl.to(gnbRef.value, {
      opacity: 1,
      duration: 0.2
    });

    if (h1) {
      tl.to(h1, {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out"
      }, "<");
    }

    if (titleEl) {
      tl.to(titleEl, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out"
      }, "<");
    }

    if (links.length) {
      tl.to(links, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2
      }, "<0.3");
    }

  }, gnbRef.value);
});

onBeforeUnmount(() => {
  if (ctx) ctx.revert();
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
