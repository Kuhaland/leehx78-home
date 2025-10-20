import axios from 'axios';

export async function fetchWeatherData(tm = '202211300900', stn = 0) {
  try {
    const response = await axios.get('http://localhost:5173/api/weather', {
      params: { tm, stn },
      responseType: 'text',
    });

    console.log('[🌐 받은 원본 텍스트 데이터]');
    console.log(response.data);

    const rawText = response.data;
    const lines = rawText.trim().split('\n');
    const headers = lines[0].split('\t');

    console.log('[🔠 헤더]', headers);

    const data = lines.slice(1).map(line => {
      const fields = line.split('\t');
      return Object.fromEntries(fields.map((v, i) => [headers[i], v]));
    });

    console.log('[✅ 파싱된 데이터]', data);

    return data;
  } catch (err) {
    console.error('[기상청 API 오류]', err);
    return [];
  }
}
