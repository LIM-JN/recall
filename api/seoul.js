export default async function handler(req, res) {
  const { path = "" } = req.query; // 예: SPOP_LOCAL_RESD_JACHI/1/25/20180823/00
  const target = `http://openapi.seoul.go.kr:8088/${path}`;

  const r = await fetch(target);
  const text = await r.text();

  // 서울 API가 json이라고 해도 종종 text로 받는 게 안전
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).send(text);
}
