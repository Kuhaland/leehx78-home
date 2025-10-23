import express from 'express';
import cors from 'cors';
import weatherRouter from '../api/weather.js';
import villageForecastRouter from '../api/villageForecast.js';

const app = express();
app.use(cors());

// 실황 관측자료 API 엔드포인트
app.use('/api/weather', weatherRouter);

// 단기예보 API 엔드포인트
app.use('/api/villageForecast', villageForecastRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ 프록시 서버 실행 중 → http://localhost:${PORT}`);
});
