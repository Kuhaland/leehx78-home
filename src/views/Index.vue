<template>
  <!-- Header -->
  <Header :delay="0.5"/>
  <!-- Content -->
  <div class="layout">
    <div class="layout-content dp-f flex-column gap-40">


    </div>
  </div>
  <!-- Footer -->
  <Footer/>
</template>
<script setup>
import { gsap } from 'gsap';
import { useRouter} from "vue-router";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from "../components/layout/Header.vue";
import Footer from "../components/layout/Footer.vue";

gsap.registerPlugin(ScrollTrigger);

const router = useRouter();
</script>

<style lang="scss" scoped>
@use '../assets/scss/variable' as *;

.layout {
  display: flex; flex-direction: column; flex: 1; gap: 20px; padding: 140px 40px 40px;
  &-content { color: color(white)};
}
</style>
