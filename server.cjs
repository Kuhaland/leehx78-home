const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/api/weather', async (req, res) => {
  try {
    const response = await axios.get('https://apihub.kma.go.kr/api/typ01/url/kma_sfctm2.php', {
      params: {
        tm: req.query.tm || '202211300900',
        stn: req.query.stn || 0,
        authKey: 'Zi84dyz_T76vOHcs_8--rg',
        serviceKey: 'Zi84dyz_T76vOHcs_8--rg'
      },
      responseType: 'text'
    });

    console.log('[✅ 기상청 원본 응답 데이터]');
    console.log(response.data);

    res.send(response.data);
  } catch (e) {
    console.error('❌ 기상청 API 호출 실패');
    console.error('[에러 메시지]', e.message);
    console.error('[에러 응답]', e.response?.data); // 서버에서 어떤 메시지를 주었는지
    res.status(500).send('기상청 API 오류');
  }
});

app.listen(3001, () => {
  console.log('✅ 프록시 서버 실행 중 → http://localhost:3001');
});
