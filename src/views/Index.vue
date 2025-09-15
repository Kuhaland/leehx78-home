<template>
  <gnb :delay="0.5" title=""/>
  <div class="content">
    <div class="content__hero">
      <h1 class="content__heading gs_reveal">Reveal animations based on scroll direction</h1>
    </div>
    <div class="features">

      <div class="features__item features__item--left gs_reveal gs_reveal_fromLeft">
        <div class="features__image">
          <div class="features__card">
            <img class="features__img" src="https://assets.codepen.io/16327/portrait-image-14.jpg" alt="">
          </div>
        </div>
        <div class="features__content">
          <h2 class="features__title gs_reveal">Highway Vinyl Nights</h2>
          <p class="features__description gs_reveal">
            The headlights hum along the painted lines<br>
            We twist the dial till static turns to choir<br>
            Your hand keeps time on the wheel and the night leans in<br>
            Every mile is a chorus we have not written yet
          </p>
        </div>
      </div>

      <div class="features__item features__item--right gs_reveal gs_reveal_fromRight">
        <div class="features__image">
          <div class="features__card">
            <img class="features__img" src="https://assets.codepen.io/16327/portrait-image-4.jpg" alt="">
          </div>
        </div>
        <div class="features__content">
          <h2 class="features__title gs_reveal">Last Diner on Route 9</h2>
          <p class="features__description gs_reveal">
            The coffee tastes like rainwater and luck<br>
            Neon flickers slow while the jukebox spins a waltz<br>
            We carve our names in steam on the window glass<br>
            Stay till sunrise and the road will wait its turn
          </p>
        </div>
      </div>

      <div class="features__item features__item--left gs_reveal gs_reveal_fromLeft">
        <div class="features__image">
          <div class="features__card">
            <img class="features__img" src="https://assets.codepen.io/16327/portrait-image-3.jpg" alt="">
          </div>
        </div>
        <div class="features__content">
          <h2 class="features__title gs_reveal">Stardust Ballroom</h2>
          <p class="features__description gs_reveal">
            Mirror tiles catch every hopeful face<br>
            Records spin thin silver threads through the dark<br>
            We move like planets pulled by quiet drums<br>
            Hold the beat and the night will never close
          </p>
        </div>
      </div>

      <div class="features__item features__item--right gs_reveal gs_reveal_fromRight">
        <div class="features__image">
          <div class="features__card">
            <img class="features__img" src="https://assets.codepen.io/16327/portrait-image-1.jpg" alt="">
          </div>
        </div>
        <div class="features__content">
          <h2 class="features__title gs_reveal">Sky Without Borders</h2>
          <p class="features__description gs_reveal">
            Lay your worries down beneath the porchlight glow<br>
            The crickets stitch soft rhythm in the grass<br>
            We trade small dreams and make them loud together<br>
            A sky without borders is waiting past the trees
          </p>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  name: 'Index',
};
</script>
<script setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Gnb from "@/components/partial/Gnb.vue";

gsap.registerPlugin(ScrollTrigger);

function animateFrom(elem, direction = 1) {
  let x = 0, y = direction * 100;

  if (elem.classList.contains('gs_reveal_fromLeft')) {
    x = -100;
    y = 0;
  } else if (elem.classList.contains('gs_reveal_fromRight')) {
    x = 100;
    y = 0;
  }

  elem.style.transform = `translate(${x}px, ${y}px)`;
  elem.style.opacity = '0';

  gsap.fromTo(elem,
      { x, y, autoAlpha: 0 },
      {
        duration: 1.25,
        x: 0,
        y: 0,
        autoAlpha: 1,
        ease: 'expo',
        overwrite: 'auto'
      }
  );
}

function hide(elem) {
  gsap.set(elem, { autoAlpha: 0 });
}

onMounted(() => {
  const elements = gsap.utils.toArray('.gs_reveal');

  elements.forEach(elem => {
    hide(elem);

    ScrollTrigger.create({
      trigger: elem,
      // markers: true,
      onEnter: () => animateFrom(elem),
      onEnterBack: () => animateFrom(elem, -1),
      onLeave: () => hide(elem)
    });
  });
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variable' as *;

.content {
  width: 100%;
  margin: 0 auto;
  padding: 10rem;
  background-color: color(grey-800);
}

.content__hero {
  height: 40vh;
  display:flex;
  align-items:center;
  justify-content:center;
}

.content__heading {
  text-align: center;
}

.features {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.features__item {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2rem;
  height: 100vh;
  border-top: dashed 2px grey;
}

.features__item--left {
  flex-direction: row;
  text-align: right;
}

.features__item--right {
  flex-direction: row-reverse;
}

.features__image {
  flex: 1 1 40%;
  position: relative;
}

.features__card {
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  aspect-ratio: 1 / 1;
}

.features__img {
  max-width: 100%;
  position: absolute;
  object-fit: cover;
  display: block;
}

.features__content {
  flex: 1 1 55%;
}

.features__title {
  font-size: 1.8em;
  margin-block-end: 1rem;
}

.features__description {
  line-height: 1.6;
}

/* GSAP animation reveal styles */
.gs_reveal {
  opacity: 0;
  visibility: hidden;
  will-change: transform, opacity;
}

.spacer {
  height: 100vh;
}

</style>
