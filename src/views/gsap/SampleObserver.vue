<template>
  <!-- Content -->
  <div :class="['sample-container', getSection(idx)]"
       v-for="(item, idx) in sectionList"
       :key="idx"
  >
    <div class="outer">
      <div class="inner">
        <div class="bg" :class="{one: idx === 0}">
          <h2 class="section-heading">{{ item.text }}</h2>
        </div>
      </div>
    </div>
  </div>
  <!-- Navigation -->
  <bottom-navi />
</template>

<script>
export default {
  name: 'SampleObserver',
};
</script>
<script setup>
import { onMounted, onBeforeUnmount, nextTick, onActivated, onDeactivated } from 'vue';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { SplitText } from 'gsap/SplitText';
import BottomNavi from "@/components/unit/BottomNavi.vue";

gsap.registerPlugin(Observer, SplitText);

const sectionList = [
  {text: 'Scroll down',},
  {text: 'Animated with GSAP',},
  {text: 'GreenSock',},
  {text: 'Animation platform',},
  {text: 'Keep scrolling',},
];
const getSection = (idx) => {
  return `type${(idx + 1)}`;
};

let sections = [];
let images = [];
let headings = [];
let outerWrappers = [];
let innerWrappers = [];
let splitHeadings = [];
let currentIndex = -1;
let animating = false;

let wrap;
let observer;

onMounted(async () => {
  await document.fonts.ready;
  await nextTick();

  sections = document.querySelectorAll(".sample-container");
  images = document.querySelectorAll(".bg");
  headings = gsap.utils.toArray(".section-heading");
  outerWrappers = gsap.utils.toArray(".outer");
  innerWrappers = gsap.utils.toArray(".inner");

  splitHeadings = headings.map(
      heading => new SplitText(heading, { type: "chars,words,lines", linesClass: "clip-text" })
  );

  wrap = gsap.utils.wrap(0, sections.length);

  gsap.set(outerWrappers, { yPercent: 100 });
  gsap.set(innerWrappers, { yPercent: -100 });

  observer = Observer.create({
    type: "wheel,touch,pointer",
    wheelSpeed: -1,
    onDown: () => !animating && gotoSection(currentIndex - 1, -1),
    onUp: () => !animating && gotoSection(currentIndex + 1, 1),
    tolerance: 10,
    preventDefault: true
  });

  gotoSection(0, 1);
});

onDeactivated(() => {
  observer?.disable();
});

onActivated(() => {
  observer?.enable();
});

onBeforeUnmount(() => {
  observer?.kill();
  observer = null;
});

function gotoSection(index, direction) {
  index = wrap(index);
  animating = true;

  const fromTop = direction === -1;
  const dFactor = fromTop ? -1 : 1;

  const tl = gsap.timeline({
    defaults: { duration: 1.25, ease: "power1.inOut" },
    onComplete: () => animating = false
  });

  if (currentIndex >= 0) {
    gsap.set(sections[currentIndex], { zIndex: 0 });

    tl.to(images[currentIndex], { yPercent: -15 * dFactor })
        .set(sections[currentIndex], { autoAlpha: 0 });
  }

  gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });

  tl.fromTo([outerWrappers[index], innerWrappers[index]], {
    yPercent: i => i ? -100 * dFactor : 100 * dFactor
  }, {
    yPercent: 0
  }, 0)
      .fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0);

  if (splitHeadings[index]?.chars) {
    tl.fromTo(splitHeadings[index].chars, {
      autoAlpha: 0,
      yPercent: 150 * dFactor
    }, {
      autoAlpha: 1,
      yPercent: 0,
      duration: 1,
      ease: "power2",
      stagger: {
        each: 0.02,
        from: "random"
      }
    }, 0.2);
  }

  currentIndex = index;
}
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variable" as *;

.sample-container {
  visibility: hidden; position: fixed; top: 0; width: 100%; height: 100%;
  .outer, .inner { overflow-y: hidden; width: 100%; height: 100%;}
  h2 {
    width: 90vw; max-width: 1200px; margin-right: -0.5em;
    font-size: clamp(1rem, 8vw, 10rem); font-weight: 600; color: color(white); text-align: center;
    text-transform: none;
    will-change: transform;
  }
  .bg {
    position: absolute; top: 0;
    display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;
    background-size: cover; background-position: center;
    h2 { z-index: 999;}
    .clip-text { overflow: hidden;}
  }
  $bg-gradient: linear-gradient( 180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.1) 100%);
  &.type1 .bg { background-image: $bg-gradient, url("https://assets.codepen.io/16327/site-landscape-1.jpg");}
  &.type2 .bg { background-image: $bg-gradient, url("https://assets.codepen.io/16327/site-landscape-5.jpg");}
  &.type3 .bg { background-image: $bg-gradient, url("https://assets.codepen.io/16327/site-landscape-2.jpg");}
  &.type4 .bg { background-image: $bg-gradient, url("https://assets.codepen.io/16327/site-landscape-6.jpg");}
  &.type5 .bg { background-image: $bg-gradient, url("https://assets.codepen.io/16327/site-landscape-8.jpg"); background-position: 50% 45%; }
}
</style>
