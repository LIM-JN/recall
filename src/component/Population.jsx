import { useEffect, useState } from "react";

const toYYYYMMDD = (yyyyDashMmDashDd) => yyyyDashMmDashDd.replaceAll("-", "");

const Population = () => {
  const [rows, setRows] = useState([]);
  const [date, setDate] = useState("2018-08-01"); // 기본값
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPop = async (selectedDate) => {
    setLoading(true);
    setError("");

    try {
      const yyyymmdd = toYYYYMMDD(selectedDate);

      // ✅ 너의 인증키로 바꿔줘
      const url = `http://openapi.seoul.go.kr:8088/7866784663616977353052717a6a76/json/SPOP_LOCAL_RESD_JACHI/1/10/${yyyymmdd}`;

      const res = await fetch(url);
      const data = await res.json();

      const list = data?.SPOP_LOCAL_RESD_JACHI?.row ?? [];
      setRows(list);
    } catch (e) {
      console.error(e);
      setError("데이터를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 처음 렌더링 시 1회 조회
  useEffect(() => {
    fetchPop(date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    fetchPop(date);
  };

  return (
    <>
      <h3>서울 생활인구 데이터</h3>

      {/* ✅ 날짜 선택 */}
      <form onSubmit={onSubmit} className="dateForm">
        <label>
          날짜&nbsp;
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <button type="submit">조회</button>

        {loading && <span>로딩중...</span>}
        {error && <span style={{ color: "crimson" }}>{error}</span>}
      </form>

      <table className="tlist" style={{ marginTop: 12 }}>
        <thead>
          <tr>
            <th>No</th>
            <th>일자</th>
            <th>행정동코드</th>
            <th>총 생활인구</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={`${r.STDR_DE_ID}-${r.ADSTRD_CODE_SE}-${idx}`}>
              <td>{idx + 1}</td>
              <td>{r.STDR_DE_ID}</td>
              <td>{r.ADSTRD_CODE_SE}</td>
              <td>{Number(r.TOT_LVPOP_CO).toLocaleString()}</td>
            </tr>
          ))}

          {!loading && rows.length === 0 && (
            <tr>
              <td colSpan={4} style={{ padding: 16 }}>
                데이터가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Population;