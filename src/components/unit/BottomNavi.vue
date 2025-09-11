<template>
  <div class="bottom-navi" ref="bottomRef">
    <div class="btn-back" @click="goBack">
      <i class="icon-arrow-prev" ref="backIcon" @mouseenter="hoverBackEffect"/>
    </div>
    <div class="btn-reload" @click="reload">
      <i class="icon-reload" ref="reloadIcon" @mouseenter="hoverReloadEffect"/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BottomNavi'
}
</script>
<script setup>
import {nextTick, onMounted, ref} from "vue";
import { useRouter } from "vue-router";
import { gsap } from "gsap";

const bottomRef = ref(null);
const router = useRouter();
const backIcon = ref(null);
const reloadIcon = ref(null);

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}
const reload = () => {
  gsap.to(reloadIcon.value, {
    rotation: 360, duration: 0.5, ease: "power1.inOut",
    onComplete: () => { location.reload();}
  });
};
const hoverBackEffect = () => {
  gsap.fromTo(backIcon.value,
      { scale: 1 },
      {scale: 1.3, duration: 0.4, ease: 'bounce.out', yoyo: true, repeat: 1}
  );
};
const hoverReloadEffect = () => {
  gsap.fromTo(reloadIcon.value,
      { scale: 1 },
      {scale: 1.3, duration: 0.4, ease: 'bounce.out', yoyo: true, repeat: 1}
  );
};

onMounted(() => {
  nextTick(() => {
    gsap.fromTo(bottomRef.value,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, delay: 0.5, ease: 'power3.out' }
    );
  });
});
</script>
<style lang="scss" scoped>
@use '@/assets/scss/variable' as *;

.bottom-navi {
  position: fixed; bottom: 20px; left: 20px; z-index: 10; display: flex; gap: 10px;
  [class^='btn-'] {
    display: inline-flex; justify-content: center; align-items: center;
    width: 60px; height: 60px; background-color: rgba(0,0,0,0.5); border-radius: 50%;
    color: color(white); cursor: pointer;
  }
  [class^='ico-'] {filter: icon-color(white); transform-origin: center;}
}
</style>
