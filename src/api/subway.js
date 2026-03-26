import express from 'express';
import axios from 'axios';

const router = express.Router();
const API_KEY = '5856696b6c6176653631736a464767';

router.get('/:station', async (req, res) => {
  const station = encodeURIComponent(req.params.station.trim());
  const url = `http://swopenAPI.seoul.go.kr/api/subway/${API_KEY}/json/realtimeStationArrival/0/10/${station}`;

  try {
    const { data } = await axios.get(url);

    // 전체 데이터 콘솔 출력
    console.log("API 원본 데이터:", data);

    // 지하철 도착 리스트만 출력
    console.log("지하철 도착 정보:", data.realtimeArrivalList);

    res.json(data.realtimeArrivalList || []);
  } catch (err) {
    console.error("API 호출 에러:", err);
    res.status(500).json({ error: '지하철 정보를 가져올 수 없습니다.' });
  }
});

export default router;
