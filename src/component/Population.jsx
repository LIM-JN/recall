import { useMemo, useState } from "react";
import { useSeoulPopulation } from "../hooks/useSeoulPopulation";

const PopulationTable = () => {
  const [date, setDate] = useState("2018-08-23");
  const [hour, setHour] = useState("ALL");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { rows, totalCount, loading, error } = useSeoulPopulation({
    date,
    hour,
    page,
    pageSize,
  });

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(totalCount / pageSize)),
    [totalCount]
  );

  return (
    <>
      <h3>서울 생활인구 데이터 (테이블)</h3>

      <div className="dateForm">
        {loading && <span>로딩중...</span>}
        {error && <span style={{ color: "crimson" }}>{error}</span>}
        <label>
          날짜&nbsp;
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setPage(1);
            }}
          />
        </label>

        <label>
          시간&nbsp;
          <select
            value={hour}
            onChange={(e) => {
              setHour(e.target.value);
              setPage(1);
            }}
          >
            <option value="ALL">전체</option>
            {Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0")).map((h) => (
              <option key={h} value={h}>
                {h}시
              </option>
            ))}
          </select>
        </label>
      </div>

      <table className="tlist" style={{ marginTop: 12 }}>
        <thead>
          <tr>
            <th>No</th>
            <th>일자</th>
            <th>시간</th>
            <th>자치구코드</th>
            <th>총 생활인구</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={`${r.STDR_DE_ID}-${r.TMZON_PD_SE}-${r.ADSTRD_CODE_SE}-${idx}`}>
              <td>{(page - 1) * pageSize + (idx + 1)}</td>
              <td>{r.STDR_DE_ID}</td>
              <td>{r.TMZON_PD_SE}</td>
              <td>{r.ADSTRD_CODE_SE}</td>
              <td>{Math.round(Number(r.TOT_LVPOP_CO)).toLocaleString()}</td>
            </tr>
          ))}
          {!loading && rows.length === 0 && (
            <tr>
              <td colSpan={5} style={{ padding: 16 }}>
                데이터가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 14 }}>
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1 || loading}>
          이전
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages || loading}
        >
          다음
        </button>
      </div>
    </>
  );
};

export default PopulationTable;
