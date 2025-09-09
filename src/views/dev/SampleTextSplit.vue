<template>
  <div class="container bg-grey-700">
    <div class="button-wrapper">
      <button @click="animate('chars')" class="button">Characters</button>
      <button @click="animate('words')" class="button">Words</button>
      <button @click="animate('lines')" class="button">Lines</button>
    </div>
    <div ref="textRef" class="text">
      Break apart HTML text into characters, words, and/or lines for easy animation.
    </div>
  </div>
  <bottom-navi/>
</template>
<script>
export default {
  name: 'SampleTextSplit',
};
</script>
<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import BottomNavi from '@/components/unit/BottomNavi.vue';

gsap.registerPlugin(SplitText);

const textRef = ref(null);
let split = null;
let animation = null;

const setupSplit = () => {
  if (split) split.revert();
  if (animation) animation.revert();

  split = SplitText.create(textRef.value, {
    type: 'chars,words,lines',
  });
};

const animate = (type) => {
  if (!split) return;
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
  animation = gsap.from(targets, config);
};

onMounted(() => {
  document.fonts.ready.then(() => {
    setupSplit();
  })
  window.addEventListener('resize', setupSplit);
});

onBeforeUnmount(() => {
  if (split) split.revert();
  if (animation) animation.revert();
  window.removeEventListener('resize', setupSplit);
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variable' as *;
.container {
  position: relative; display: flex; flex-direction: column; align-items: center; justify-content: space-evenly;
  width: 100%; height: 100vh; border-radius: 1.0rem;
  .text {
    flex: 1; width: 100%; padding: 5%;
    font-size: clamp(2rem, 12rem, 5vw); color: color(white); line-height: 1.2; text-align: center;
    box-sizing: border-box; perspective: 50.0rem;
  }
  .button-wrapper {
    display: flex; align-items: center; justify-content: center; gap: 1.0rem; padding: 8.0rem 0;
    .button {
      padding: 0.6em 1.2em; background: color(white); border-radius: 1.2rem;
      font-size: clamp(2rem, 2rem, 5vw); cursor: pointer; transition: all 0.2s ease;
      &:hover { background-color: color(grey-400);}
    }
  }
}


</style>
