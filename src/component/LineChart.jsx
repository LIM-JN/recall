import { useMemo, useState } from "react";
import {
  LineChart as RLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSeoulPopulation } from "../hooks/useSeoulPopulation";

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

const hourList = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));

const LineChart = () => {
  const [date, setDate] = useState("2018-08-23");
  const [guCode, setGuCode] = useState("11545"); // 기본값: 금천구 (원하는 구로 바꿔도 됨)

  // ✅ 라인차트는 "한 구"의 "24시간"이 핵심이니까
  // 시간은 전체(" ")로 고정, 1~24개 한 번에 받기
  const hour = " ";
  const page = 1;
  const pageSize = 24;

  const { rows, loading, error } = useSeoulPopulation({
    date,
    hour,
    page,
    pageSize,
    guCode,
  });

  // ✅ rows를 00~23으로 정리 + 누락시간은 0으로 채우기
  const chartData = useMemo(() => {
    // rows가 시간별로 24개 온다고 가정하지만, 혹시 모르니 map으로 정리
    const byHour = new Map();
    for (const r of rows) {
      const h = String(r.TMZON_PD_SE).padStart(2, "0");
      const v = Math.round(Number(r.TOT_LVPOP_CO));
      byHour.set(h, v);
    }

    return hourList.map((h) => ({
      hour: h,
      value: byHour.get(h) ?? 0,
    }));
  }, [rows]);

  const titleGuName = guMap[guCode] ?? "선택한 자치구";

  const maxValue = useMemo(() => {
    return chartData.reduce((m, d) => Math.max(m, d.value), 0);
  }, [chartData]);

  return (
    <div style={{width:'80%', margin:'auto'}}>
      <h3>서울 생활인구 데이터 (라인그래프)</h3>

      <div className="dateForm" >
        {loading && <span>로딩중...</span>}
        {error && <span style={{ color: "crimson" }}>{error}</span>}

        <label>
          날짜&nbsp;
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <label>
          자치구&nbsp;
          <select value={guCode} onChange={(e) => setGuCode(e.target.value)}>
            {Object.entries(guMap).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div style={{ marginTop: 14 }}>
        <div style={{ marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
          <strong>{titleGuName} 시간대별 총 생활인구</strong>
          <span style={{ opacity: 0.8 }}>
            최대: {maxValue.toLocaleString()}
          </span>
        </div>

        <div style={{ width: "100%", height: 420 }}>
          <ResponsiveContainer>
            <RLineChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" tickFormatter={(h) => `${h}`} />
              <YAxis tickFormatter={(v) => v.toLocaleString()} width={80} />
              <Tooltip
                formatter={(v) => Number(v).toLocaleString()}
                labelFormatter={(label) => `${label}시`}
              />
              <Line
                type="monotone"
                dataKey="value"
                dot={false}
                strokeWidth={3}
              />
            </RLineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default LineChart;