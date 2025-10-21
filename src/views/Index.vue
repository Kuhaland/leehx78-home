<template>
  <!-- Header -->
  <Header :delay="0.5"/>
  <!-- Content -->
  <div class="layout">
    <div class="layout-content">

      <div class="weather-wrap">
        <h2>기상청 실황 관측자료</h2>
        <table v-if="weatherList && weatherList.length"
               style="width: 1000px; border: 1px solid white"
               class="mt-20"
        >
          <thead>
          <tr>
            <th class="fs-14 pv-10" style="border-bottom: 1px solid white;">관측시각</th>
            <th class="fs-14 pv-10" style="border-left: 1px solid white; border-bottom: 1px solid white;">지점명</th>
            <th class="fs-14 pv-10" style="border-left: 1px solid white; border-bottom: 1px solid white;">풍향</th>
            <th class="fs-14 pv-10" style="border-left: 1px solid white; border-bottom: 1px solid white;">풍속</th>
            <th class="fs-14 pv-10" style="border-left: 1px solid white; border-bottom: 1px solid white;">기온</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, i) in weatherList" :key="i">
            <td class="fs-14">{{ item['관측시각'] }}</td>
            <td class="fs-14" style="border-left: 1px solid white;">{{ item['지점명'] }}</td>
            <td class="fs-14" style="border-left: 1px solid white;">{{ item['풍향'] }}</td>
            <td class="fs-14" style="border-left: 1px solid white;">{{ item['풍속'] }}</td>
            <td class="fs-14" style="border-left: 1px solid white;">{{ item['기온'] }}</td>
          </tr>
          </tbody>
        </table>
        <p v-else>데이터 불러오는 중...</p>
      </div>

    </div>
  </div>
  <!-- Footer -->
  <Footer/>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from "../components/layout/Header.vue";
import Footer from "../components/layout/Footer.vue";
import { fetchWeatherData } from '../api/weather';

gsap.registerPlugin(ScrollTrigger);

const weatherList = ref([]);

onMounted(async () => {
  const [data] = await Promise.all([fetchWeatherData()]);
  weatherList.value = data;
  console.log('[📦 weatherList]', weatherList.value);
});

</script>

<style lang="scss" scoped>
@use '../assets/scss/variable' as *;

.layout {
  display: flex; flex-direction: column; flex: 1; gap: 20px; padding: 140px 40px 40px;
  &-content { color: color(white)};
}
</style>
