<template>
  <!-- Header -->
  <Header :delay="0.5"/>
  <!-- Content -->
  <div class="layout">
    <div class="layout-content dp-f gap-40">

      <!-- Weather -->
      <div class="weather-wrap">
        <h2 class="fs-18">기상청 실황 관측자료 <span class="fs-14 ls-m-10" v-if="latestTime">({{ latestTime }})</span></h2>
        <table v-if="weatherList && weatherList.length" class="mt-10">
          <thead>
          <tr>
            <th class="wmd-120">지점명</th>
            <th>기온 (°C)</th>
            <th>풍향 (16방위)</th>
            <th>풍속 (m/s)</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, i) in weatherList" :key="i">
            <td class="wd-120 fc-fffa7f">{{ item['지점명'] || '-' }}</td>
            <td>{{ item['기온'] || '-' }}</td>
            <td>{{ item['풍향'] || '-' }}</td>
            <td>{{ item['풍속'] || '-' }}</td>
          </tr>
          </tbody>
        </table>
        <p v-else>데이터 불러오는 중...</p>
      </div>

      <!-- VillageForecast -->
      <div class="weather-wrap">
        <h2 class="fs-18">단기예보 (서울)</h2>
        <table v-if="forecastList.length" class="mt-10">
          <thead>
          <tr>
            <th>항목</th>
            <th>예보시간</th>
            <th>값</th>
            <th>설명</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, i) in forecastList" :key="i">
            <td>{{ item.category }}</td>
            <td>{{ item.obsrDate }} {{ item.obsrTime }}</td>
            <td>{{ item.obsrValue }}</td>
            <td>{{ item.description }}</td>
          </tr>
          </tbody>
        </table>
        <p v-else>데이터 불러오는 중...</p>
      </div>

      <!-- Subway -->
      <div class="subway-wrap">
        <h2 class="fs-18">실시간 지하철 도착 정보</h2>
        <p class="fs-14">다음 갱신까지 ⏳ <strong>{{ countdown }}</strong>초</p>

        <div v-if="subwayLoading">조회 중...</div>
        <div v-if="subwayError" class="error">{{ subwayError }}</div>

        <div v-for="station in subwayStations" :key="station" class="station-block mt-20">
          <h3 class="fs-16 mb-4 pl-10">{{ station }}역</h3>
          <ul v-if="subwayDataMap[station] && subwayDataMap[station].length" class="bd-white pa-20 bdr-12">
            <li v-for="(item, i) in subwayDataMap[station]" :key="i" class="dp-f gap-4">
              <strong class="fs-14 wd-260">{{ item.trainLineNm }}</strong>
              <span class="fs-14">{{ item.arvlMsg2 }}</span>
              <span class="fs-14">상태: {{ item.btrainSttus }} | 방향: {{ item.updnLine }}</span>
            </li>
          </ul>
          <p v-else>데이터 없음</p>
        </div>
      </div>

    </div>
  </div>
  <!-- Footer -->
  <Footer/>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';
import Header from "../components/layout/Header.vue";
import Footer from "../components/layout/Footer.vue";

gsap.registerPlugin(ScrollTrigger);

/// 기상청 관련
const weatherList = ref([]);
const forecastList = ref([]);

const latestTime = computed(() => weatherList.value[0]?.['일시'] || '');

onMounted(async () => {
  const now = new Date();
  const pad = (n) => n.toString().padStart(2, '0');
  const tm = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}00`;

  // 1. 실황 관측자료
  try {
    const res1 = await axios.get(`/api/weather`, {
      params: { tm,  }
    });
    weatherList.value = res1.data;
    console.log('[✅ 관측자료]', weatherList.value);
  } catch (err) {
    console.error('[❌ 관측자료 API 오류]', err);
  }

  // 2. 단기예보 (서울 좌표 nx=60, ny=127)
  try {
    const res2 = await axios.get(`/api/villageForecast`, {
      params: { nx: 60, ny: 127 }
    });
    forecastList.value = res2.data;
    console.log('[✅ 단기예보]', forecastList.value);
  } catch (err) {
    console.error('[❌ 단기예보 API 오류]', err.message);
  }
});

/// 지하철 관련
const subwayList = ref([]);
const subwayStations = ref(['문정', '석촌', '노량진', '구일']);
const subwayDataMap = ref({});
const subwayLoading = ref(false);
const subwayError = ref('');
const countdown = ref(30);
let refreshTimer = null;
let countdownTimer = null;

const fetchAllArrivalData = async () => {
  subwayLoading.value = true;
  subwayError.value = '';
  subwayDataMap.value = {};

  try {
    for (const station of subwayStations.value) {
      const res = await fetch(`/api/subway/${encodeURIComponent(station.trim())}`);
      const data = await res.json();
      if (data?.error) {
        subwayDataMap.value[station] = [{ error: data.error }];
      } else {
        subwayDataMap.value[station] = data;
      }
    }
  } catch (err) {
    subwayError.value = '데이터 요청 중 오류가 발생했습니다.';
  } finally {
    subwayLoading.value = false;
  }
};

const startCountdown = () => {
  countdown.value = 30;
  countdownTimer = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      fetchAllArrivalData();
      countdown.value = 30;
    }
  }, 1000);
};

onMounted(() => {
  fetchAllArrivalData();
  startCountdown();
});

onBeforeUnmount(() => {
  if (countdownTimer) clearInterval(countdownTimer);
});
</script>

<style lang="scss" scoped>
@use '../assets/scss/variable' as *;

.layout {
  display: flex; flex-direction: column; flex: 1; gap: 20px; padding: 140px 40px 40px;
  &-content { color: color(white)};
}
</style>
