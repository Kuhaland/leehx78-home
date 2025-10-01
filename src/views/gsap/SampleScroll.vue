<template>
  <!-- Header -->
  <Header delay="0.5"/>
  <!-- Content -->
  <div class="content">
    <!-- Content -->
    <div class="content-top">
      <h1 class="content-top-heading gs-reveal">Scroll Test Section</h1>
    </div>
    <!-- Content -->
    <div class="content-features">
      <!-- Content -->
      <div class="content-features-item left gs-reveal gs-reveal-fromLeft">
        <div class="content-features-item-img">
          <div class="card">
            <img class="card-img" src="https://assets.codepen.io/16327/portrait-image-14.jpg" alt="">
          </div>
        </div>
        <div class="content-features-item-content">
          <h2 class="content-features-item-content-title gs-reveal">Highway Vinyl Nights</h2>
          <p class="content-features-item-content-description gs-reveal">
            The headlights hum along the painted lines<br>
            We twist the dial till static turns to choir<br>
            Your hand keeps time on the wheel and the night leans in<br>
            Every mile is a chorus we have not written yet
          </p>
        </div>
      </div>
      <!-- Content -->
      <div class="content-features-item right gs-reveal gs-reveal-fromRight">
        <div class="content-features-item-img">
          <div class="card">
            <img class="card-img" src="https://assets.codepen.io/16327/portrait-image-4.jpg" alt="">
          </div>
        </div>
        <div class="content-features-item-content">
          <h2 class="content-features-item-content-title gs-reveal">Last Diner on Route 9</h2>
          <p class="content-features-item-content-description gs-reveal">
            The coffee tastes like rainwater and luck<br>
            Neon flickers slow while the jukebox spins a waltz<br>
            We carve our names in steam on the window glass<br>
            Stay till sunrise and the road will wait its turn
          </p>
        </div>
      </div>
      <!-- Content -->
      <div class="content-features-item left gs-reveal gs-reveal-fromLeft">
        <div class="content-features-item-img">
          <div class="card">
            <img class="card-img" src="https://assets.codepen.io/16327/portrait-image-3.jpg" alt="">
          </div>
        </div>
        <div class="content-features-item-content">
          <h2 class="content-features-item-content-title gs-reveal">Stardust Ballroom</h2>
          <p class="content-features-item-content-description gs-reveal">
            Mirror tiles catch every hopeful face<br>
            Records spin thin silver threads through the dark<br>
            We move like planets pulled by quiet drums<br>
            Hold the beat and the night will never close
          </p>
        </div>
      </div>
      <!-- Content -->
      <div class="content-features-item right gs-reveal gs-reveal-fromRight">
        <div class="content-features-item-img">
          <div class="card">
            <img class="card-img" src="https://assets.codepen.io/16327/portrait-image-1.jpg" alt="">
          </div>
        </div>
        <div class="content-features-item-content">
          <h2 class="content-features-item-content-title gs-reveal">Sky Without Borders</h2>
          <p class="content-features-item-content-description gs-reveal">
            Lay your worries down beneath the porchlight glow<br>
            The crickets stitch soft rhythm in the grass<br>
            We trade small dreams and make them loud together<br>
            A sky without borders is waiting past the trees
          </p>
        </div>
      </div>
      <!-- Content -->
    </div>
  </div>
  <!-- Footer -->
  <Footer/>
</template>
<script setup>
import { onMounted, onBeforeUnmount, onActivated, onDeactivated, nextTick } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from "@/components/layout/Footer.vue";
import Header from "@/components/layout/Header.vue";

defineOptions({ name: "SampleScroll" });

gsap.registerPlugin(ScrollTrigger);

function animateFrom(elem, direction = 1) {
  let x = 0, y = direction * 300;
  if (elem.classList.contains('gs-reveal-fromLeft')) { x = -300; y = 0; }
  else if (elem.classList.contains('gs-reveal-fromRight')) { x = 300; y = 0; }

  elem.style.transform = `translate(${x}px, ${y}px)`;
  elem.style.opacity = '0';

  gsap.fromTo(elem, { x, y, autoAlpha: 0 }, {
    duration: 1.1,
    x: 0,
    y: 0,
    autoAlpha: 1,
    ease: 'expo',
    overwrite: 'auto'
  });
}

function hide(elem) {
  gsap.set(elem, { autoAlpha: 0 });
}

function waitForImages(root = document) {
  const imgs = Array.from(root.querySelectorAll('img')).filter(img => !img.complete);
  if (!imgs.length) return Promise.resolve();
  return new Promise(resolve => {
    let done = 0;
    const finish = () => (++done === imgs.length) && resolve();
    imgs.forEach(img => {
      img.addEventListener('load', finish, { once: true });
      img.addEventListener('error', finish, { once: true });
    });
  });
}

let ctx;

onMounted(async () => {
  await nextTick();
  try { await document.fonts?.ready; } catch (_) {}
  await waitForImages(document.querySelector('.content'));

  ctx = gsap.context(() => {
    const elements = gsap.utils.toArray('.gs-reveal');

    elements.forEach((elem) => {
      hide(elem);
      ScrollTrigger.create({
        trigger: elem,
        start: 'top 85%',
        end: 'bottom top',
        markers: false,
        onEnter: () => animateFrom(elem),
        onEnterBack: () => animateFrom(elem, -1),
        onLeave: () => hide(elem)
      });
    });
  });

  ScrollTrigger.refresh();
});

onBeforeUnmount(() => {
  ctx?.revert();
});

onActivated(() => {
  ScrollTrigger.refresh();
});
onDeactivated(() => {
  ctx?.revert();
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variable' as *;

.content {
  display: flex; flex-direction: column; justify-content: center; width: 100%;
  padding: 0 clamp(1rem, 5vw, 4rem);
  background-color: color(grey-800);
  &-top {
    display:flex; align-items:center; justify-content:center;
    padding: clamp(20rem, 20vw, 40rem) clamp(1rem, 5vw, 4rem) clamp(12rem, 20vw, 34rem);
    color: #a9ffd1;
    &-heading { text-align: center; font-size: clamp(1rem, 6vw, 12rem); line-height: 1.1}
  }
  &-features {
    display: flex; flex-direction: column; gap: 3rem;
    &-item {
      display: flex; flex-wrap: wrap; align-items: center; gap: 2rem; padding: clamp(4vw, 8vw, 10vw) 0;
      border-top: dashed 2px grey;
      &.left { flex-direction: row; text-align: right;}
      &.right { flex-direction: row-reverse;}
      &-img {
        flex: 1 1 40%; position: relative;
        .card {
          overflow: hidden; position: relative; aspect-ratio: 1 / 1; border-radius: clamp(0.8rem, 2vw, 2.0rem);
          &-img { position: absolute; inset: 0; display: block; width: 100%; height: 100%; object-fit: cover;}
        }
      }
      &-content {
        flex: 1 1 55%;
        &-title { font-size: clamp(1rem, 5vw, 6rem); color: color(grey-100); margin-block-end: 1rem;}
        &-description { font-size: clamp(1rem, 2.5vw, 2rem); color: color(grey-400); line-height: 1.6;}
      }
    }
  }
  .gs-reveal { opacity: 0; visibility: hidden; will-change: transform, opacity;}
}
</style>
