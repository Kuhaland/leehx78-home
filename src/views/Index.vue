<template>
  <!-- Header -->
  <Header :delay="0.5"/>
  <!-- Content -->
  <div class="layout">
    <div class="layout-content">

      <div class="weather-wrap">
        <h2>기상청 실황 관측자료</h2>
        <table v-if="weatherList.length">
          <thead>
          <tr>
            <th>지점</th>
            <th>일시</th>
            <th>기온</th>
            <th>강수량</th>
            <th>풍속</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, i) in weatherList.slice(0, 10)" :key="i">
            <td>{{ item['지점명'] }}</td>
            <td>{{ item['일시'] }}</td>
            <td>{{ item['기온(°C)'] }}</td>
            <td>{{ item['강수량(mm)'] }}</td>
            <td>{{ item['풍속(m/s)'] }}</td>
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
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";
import { fetchWeatherData } from '@/api/weather';

gsap.registerPlugin(ScrollTrigger);

const weatherList = ref([]);

onMounted(async () => {
  weatherList.value = await fetchWeatherData();
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/variable' as *;

.layout {
  display: flex; flex-direction: column; flex: 1; gap: 20px; padding: 140px 40px 40px;
  &-content { color: color(white)};
}
</style>
