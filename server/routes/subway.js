import express from 'express'
import axios from 'axios'

const router = express.Router()

const API_KEY = process.env.SUBWAY_API_KEY

router.get('/:station', async (req, res) => {
  const station = encodeURIComponent(req.params.station.trim())

  const url =
    `http://swopenapi.seoul.go.kr/api/subway/${API_KEY}/json/realtimeStationArrival/0/10/${station}`

  try {
    const { data } = await axios.get(url)

    console.log('API 원본 데이터:', data)

    res.json(data.realtimeArrivalList || [])
  } catch (err) {
    console.error('API 호출 에러:', err.response?.data || err.message)

    res.status(500).json({
      error: '지하철 정보를 가져올 수 없습니다.'
    })
  }
})

export default router
