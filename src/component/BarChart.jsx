import { useMemo, useState } from "react";
import { useSeoulPopulation } from "../hooks/useSeoulPopulation";

// Recharts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const guMap = {
  "11110": "종로구",
  "11140": "중구",
  "11170": "용산구",
  "11200": "성동구",
  "11215": "광진구",
  "11230": "동대문구",
  "11260": "중랑구",
  "11290": "성북구",
  "11305": "강북구",
  "11320": "도봉구",
  "11350": "노원구",
  "11380": "은평구",
  "11410": "서대문구",
  "11440": "마포구",
  "11470": "양천구",
  "11500": "강서구",
  "11530": "구로구",
  "11545": "금천구",
  "11560": "영등포구",
  "11590": "동작구",
  "11620": "관악구",
  "11650": "서초구",
  "11680": "강남구",
  "11710": "송파구",
  "11740": "강동구",
};

const PopulationChart = () => {
  const [date, setDate] = useState("2018-08-23");
  const [hour, setHour] = useState("00");

  // ✅ 구별 비교용: 한 번에 25개 정도 받기
  const { rows, loading, error } = useSeoulPopulation({
    date,
    hour,
    page: 1,
    pageSize: 25,
  });

  const chartData = useMemo(() => {
    return (rows ?? [])
      .map((r) => ({
        gu: guMap[r.ADSTRD_CODE_SE] ?? r.ADSTRD_CODE_SE,
        value: Math.round(Number(r.TOT_LVPOP_CO)),
      }))
      .sort((a, b) => b.value - a.value); // 보기 좋게 정렬(내림차순)
  }, [rows]);

  return (
    <>
      <h3>서울 생활인구 데이터 (막대그래프)</h3>

      <div style={{ width: "80%", display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", margin:'auto', justifyContent:"flex-end" }}>
        {loading && <span>로딩중...</span>}
        {error && <span style={{ color: "crimson" }}>{error}</span>}
        <label>
          날짜&nbsp;
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>

        <label>
          시간&nbsp;
          <select value={hour} onChange={(e) => setHour(e.target.value)}>
            {Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0")).map((h) => (
              <option key={h} value={h}>
                {h}시
              </option>
            ))}
          </select>
        </label>
      </div>

      <div style={{ width: "80%", height: 420, marginTop: 12,margin:'12px auto' }}>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="gu" interval={0} angle={-35} textAnchor="end" height={80} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default PopulationChart;
