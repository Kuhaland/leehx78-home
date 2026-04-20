import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import weatherRouter from './routes/weather.js';
import villageForecastRouter from './routes/villageForecast.js';
import subwayRouter from './routes/subway.js';

const app = express();
app.use(cors());

// 실황 관측자료 API 엔드포인트
app.use('/api/weather', weatherRouter);

// 단기예보 API 엔드포인트
app.use('/api/villageForecast', villageForecastRouter);

// 지하철 API 엔드포인트
app.use('/api/subway', subwayRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ 프록시 서버 실행 중 → http://localhost:${PORT}`);
});
