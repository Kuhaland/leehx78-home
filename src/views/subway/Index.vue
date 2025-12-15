<template>
  <!-- Header -->
  <Header :delay="0.5"/>
  <!-- Content -->
  <div class="layout">
    <div class="layout-content dp-f gap-40">

      <!-- Subway -->
      <div class="subway-wrap">
        <h2 class="fs-18">실시간 지하철 도착 정보</h2>
        <p class="fs-14">다음 갱신까지 ⏳ <strong>{{ countdown }}</strong>초</p>

        <div v-if="subwayLoading">조회 중...</div>
        <div v-if="subwayError" class="error">{{ subwayError }}</div>

        <div class="grid-wrap gc-template-2 gcr-gap-20 mt-20">

          <div v-for="station in subwayStations"
               :key="station"
               class="station-block"
          >
            <h3 class="fs-16 mb-4 pl-10">{{ station }}역</h3>
            <ul v-if="subwayDataMap[station] && subwayDataMap[station].length"
                class="bd-white pa-20 bdr-12"
            >
              <li v-for="(item, i) in subwayDataMap[station]"
                  :key="i"
                  class="dp-f gap-4"
              >
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
  </div>
  <!-- Footer -->
  <Footer/>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';
import Header from "../../components/layout/Header.vue";
import Footer from "../../components/layout/Footer.vue";

gsap.registerPlugin(ScrollTrigger);

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
@use '../../assets/scss/variable' as *;

.layout {
  display: flex; flex-direction: column; flex: 1; gap: 20px; padding: 140px 40px 40px;
  &-content { color: color(white)};
}
</style>
