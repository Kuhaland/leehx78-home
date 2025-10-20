<template>
  <!-- Header -->
  <Header :delay="0.5"/>
  <!-- Content -->
  <div class="sample-container">
    <div class="sample-container-button">
      <button @click="animate('chars')" class="button" :disabled="isAnimating">Characters</button>
      <button @click="animate('words')" class="button" :disabled="isAnimating">Words</button>
      <button @click="animate('lines')" class="button" :disabled="isAnimating">Lines</button>
    </div>
    <div ref="textRef" class="sample-container-text">
      Break apart HTML text into characters, words, and/or lines for easy animation.
    </div>
  </div>
</template>
<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import Header from "@/components/layout/Header.vue";

defineOptions({ name: "SampleTextSplit" });

gsap.registerPlugin(SplitText);

const textRef = ref(null);
let split = null;
let animation = null;
const isAnimating = ref(false);

const setupSplit = () => {
  if (split) split.revert();
  if (animation) animation.revert();

  split = SplitText.create(textRef.value, {
    type: 'chars,words,lines',
  });
};

const animate = (type) => {
  if (!split || isAnimating.value) return;
  if (animation) animation.revert();

  const configMap = {
    chars: {
      targets: split.chars,
      config: { x: -150, opacity: 0, duration: 0.7, ease: 'power4', stagger: 0.04 },
    },
    words: {
      targets: split.words,
      config: { y: -100, opacity: 0, rotation: "random(-80, 80)", duration: 0.7, ease: "back", stagger: 0.15 },
    },
    lines: {
      targets: split.lines,
      config: { rotationX: -100, transformOrigin: "50% 50% -160px", opacity: 0, duration: 0.8, ease: "power3", stagger: 0.25 },
    }
  };

  const { targets, config } = configMap[type];

  isAnimating.value = true;
  animation = gsap.from(targets, {
    ...config,
    onComplete: () => {
      isAnimating.value = false;
    }
  });
};

let resizeTimeout;
onMounted(() => {
  document.fonts.ready.then(() => {
    setupSplit();
    animate('chars');
  });

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(setupSplit, 300);
  });

  gsap.from('.sample-container', {
    opacity: 0,
    x: 1000,
    duration: 0.6,
    ease: 'power2.out'
  });
});

onBeforeUnmount(() => {
  if (split) split.revert();
  if (animation) animation.revert();
  window.removeEventListener('resize', setupSplit);
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variable' as *;

.sample-container {
  position: relative; display: flex; flex-direction: column; align-items: center; justify-content: space-evenly;
  width: 100%; height: 100vh;
  background-color: color(grey-800);
  &-button {
    display: flex; align-items: center; justify-content: center; gap: 1.0rem; padding: 22.0rem 0 1rem;
    .button {
      width: clamp(14rem, 8vw, 18rem); height: 6rem; background: color(white); border-radius: 1.2rem;
      font-size: clamp(2rem, 2rem, 5vw); cursor: pointer; transition: all 0.2s ease;
      &:hover { animation: bounce 0.5s;}
      &:disabled { opacity: 0.6; pointer-events: none;}
    }
  }
  &-text {
    flex: 1; width: 100%; padding: 5%;
    font-size: clamp(2rem, 8vw, 5vw); color: color(white); line-height: 1.2; letter-spacing:  clamp(0rem, 8vw, -0.3vw); text-align: center;
    box-sizing: border-box; perspective: 50.0rem;
  }
}
@keyframes bounce {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.05); }
  70%  { transform: scale(0.85); }
  100% { transform: scale(1); }
}
</style>
