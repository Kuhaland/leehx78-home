// server/api/vilageForecast.js
import express from 'express';
import axios from 'axios';

const router = express.Router();

// ⏱ base_date / base_time 계산 로직
function getForecastTime() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - 30);
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');

  const validHours = ['0200', '0500', '0800', '1100', '1400', '1700', '2000', '2300'];
  let baseTime = validHours[0];
  for (let t of validHours) if (hh + '00' >= t) baseTime = t;

  return { base_date: `${yyyy}${mm}${dd}`, base_time: baseTime };
}

function explainCategory(cat, val) {
  const maps = {
    SKY: { '1': '맑음', '3': '구름많음', '4': '흐림' },
    PTY: {
      '0': '없음',
      '1': '비',
      '2': '비/눈',
      '3': '눈',
      '4': '소나기',
    },
  };
  return maps[cat]?.[val] || '';
}

router.get('/', async (req, res) => {
  const { base_date, base_time } = getForecastTime();
  const { nx = 60, ny = 127 } = req.query;

  // 실제 발급받은 정식 serviceKey를 여기에 넣으세요
  const SERVICE_KEY = encodeURIComponent('f968f9f3493c10b95d1f9f7f0187b81c7e9e4b8f5c9b18b4e6bc0eb352584922');

  try {
    const response = await axios.get(
      'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst',
      {
        params: {
          serviceKey: SERVICE_KEY,
          pageNo: 1,
          numOfRows: 1000,
          dataType: 'JSON',
          base_date,
          base_time,
          nx,
          ny,
        },
      }
    );

    const items = response.data?.response?.body?.items?.item || [];

    const parsed = items.map((item) => ({
      category: item.category,
      fcstDate: item.fcstDate,
      fcstTime: item.fcstTime,
      fcstValue: item.fcstValue,
      description: explainCategory(item.category, item.fcstValue),
    }));

    console.log('[✅ 초단기실황 데이터]', parsed.slice(0, 5));
    res.json(parsed);
  } catch (e) {
    console.error('[❌ 단기예보 API 오류]', e.message);
    console.error('[❌ 응답 전체]', e?.response?.data || e);
    res.status(500).send('단기예보 API 오류');
  }
});

export default router;
