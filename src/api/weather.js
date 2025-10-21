import axios from 'axios';

const stationMap = {
  108: '서울',
  105: '강릉',
  129: '대구',
  159: '부산',
  146: '제주',
  115: '대전',
  133: '전주',
  // 필요한 지점 추가
};

function formatTime(str) {
  if (!str || str.length !== 12) return str;
  return `${str.slice(0, 4)}-${str.slice(4, 6)}-${str.slice(6, 8)} ${str.slice(8, 10)}:${str.slice(10, 12)}`;
}

export async function fetchWeatherData(tm = '202211300900', stn = 0) {
  try {
    const response = await axios.get('http://localhost:5173/api/weather', {
      params: { tm, stn },
      responseType: 'text',
    });

    const rawText = response.data;
    const lines = rawText.trim().split('\n');

    // 유효한 데이터 라인만 필터링
    const cleanLines = lines.filter(line => line && !line.startsWith('#'));

    // 첫 번째 줄은 헤더
    const headers = cleanLines[0].trim().split(/\s+/);

    // 나머지는 데이터
    const dataLines = cleanLines.slice(1);

    const parsed = dataLines.map(line => {
      const fields = line.trim().split(/\s+/);
      return Object.fromEntries(fields.map((v, i) => [headers[i], v]));
    });

    // 원하는 정보만 변환해서 리턴
    return parsed.map(item => ({
      '지점명': stationMap[item.STN] || item.STN,
      '일시': formatTime(item.YYMMDDHHMI),
      '기온(°C)': item.TA,
      '강수량(mm)': item.RN,
      '풍속(m/s)': item.WS,
    }));
  } catch (err) {
    console.error('[기상청 API 오류]', err);
    return [];
  }
}
