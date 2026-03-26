<template>
  <!-- Header -->
  <Header :delay="0.5"/>
  <!-- Content -->
  <div class="wrap" ref="wrap">
    <div class="ball" ref="ball"></div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import gsap from "gsap";
import Header from "@/components/layout/Header.vue";

defineOptions({ name: "SampleAnimation" });

const ball = ref();

onMounted(() => {
  const tl = gsap.timeline({ repeat: -1 });

  tl.to(ball.value, {
    y: 200,
    duration: 0.6,
    ease: "power2.in"
  })
      // 바닥 닿을 때 눌림
      .to(ball.value, {
        scaleY: 0.7,
        scaleX: 1.2,
        duration: 0.1,
        ease: "power1.out"
      })
      // 튀어오름
      .to(ball.value, {
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      })
      // 다시 원형 복구
      .to(ball.value, {
        scaleY: 1,
        scaleX: 1,
        duration: 0.1
      });
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variable' as *;
.wrap {
  height: 300px;
  position: relative;
  margin: 0 auto;
  top: 50%;
  transform: translateY(-50%);
}

.ball {
  width: 40px;
  height: 40px;
  background: red;
  position: absolute;
  border-radius: 50%;
}
</style>
