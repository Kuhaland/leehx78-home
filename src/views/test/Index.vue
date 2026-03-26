<template>
  <!-- Header -->
  <Header :delay="0.5"/>
  <!-- Content -->
  <div class="layout">
    <div class="layout-content dp-f flex-column gap-40">

      <button class="fs-24 bd-white wd-300 pa-20 bdr-20"
              v-for="item in data.list"
              @click="go(item.path)"
      >
        {{ item.title }}
      </button>

    </div>
  </div>
  <!-- Footer -->
  <Footer/>
</template>
<script setup>
import {reactive} from "vue";
import { gsap } from 'gsap';
import { useRouter} from "vue-router";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";

gsap.registerPlugin(ScrollTrigger);

const router = useRouter();

const go = (path) => router.push(path);

const data = reactive({
  list: [
    {title: 'GASP', path: '/test/gsap'},
    {title: '기상청 API 보기', path: '/test/weather'},
    {title: '실시간 지하철 정보 보기', path: '/test/subway'},
  ]
});

</script>

<style lang="scss" scoped>
@use '@/assets/scss/variable' as *;

.layout {
  display: flex; flex-direction: column; flex: 1; gap: 20px; padding: 140px 40px 40px;
  &-content { color: color(white)};
}
</style>
