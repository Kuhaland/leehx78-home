import express from 'express';
import axios from 'axios';
import stationMap from '../data/stationMap.js';

const router = express.Router();

function formatTime(val) {
  if (!val || val.length !== 12) return '';
  const yyyy = val.slice(0, 4);
  const mm = val.slice(4, 6);
  const dd = val.slice(6, 8);
  const hh = val.slice(8, 10);
  const mi = val.slice(10, 12);
  return `${yyyy}-${mm}-${dd} ${hh}:${mi}`;
}

function getCurrentTM() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - 30);
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  return `${yyyy}${mm}${dd}${hh}${min}`;
}

router.get('/', async (req, res) => {
  const SERVICE_KEY = encodeURIComponent('Zi84dyz_T76vOHcs_8--rg');
  try {
    const response = await axios.get('https://apihub.kma.go.kr/api/typ01/url/kma_sfctm2.php', {
      params: {
        tm: req.query.tm || getCurrentTM(),
        stn: req.query.stn || 0,
        authKey: SERVICE_KEY,
        serviceKey: SERVICE_KEY
      },
      responseType: 'text'
    });

    const rawText = response.data;
    const lines = rawText.trim().split('\n');

    const headerLine = lines.find(line => line.includes('YYMMDDHHMI'));
    const headers = headerLine.replace(/^#\s*/, '').trim().split(/\s+/);
    const dataLines = lines.filter(line => !line.startsWith('#'));

    const parsed = dataLines.map(line => {
      const fields = line.trim().split(/\s+/);
      const obj = {};
      headers.forEach((key, i) => {
        obj[key] = fields[i];
      });
      return obj;
    });

    const result = parsed.map(item => ({
      '지점명': stationMap[item?.STN] || item?.STN || '알수없음',
      '기온': item?.TA,
      '풍향': item?.WD,
      '풍속': item?.WS,
      '강수량': item?.RN,
      '일시': item?.YYMMDDHHMI ? formatTime(item.YYMMDDHHMI) : '',
    }));

    console.log('[✅ 실황 관측자료 데이터]', result);
    res.json(result);
  } catch (e) {
    console.error('[❌ API 호출 실패]', e.message);
    res.status(500).send('기상청 API 오류');
  }
});

export default router;
