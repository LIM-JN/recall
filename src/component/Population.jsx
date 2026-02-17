import { useEffect, useMemo, useState } from "react";

const toYYYYMMDD = (v) => v.replaceAll("-", "");

// ✅ 자치구 코드 → 이름
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

const Population = () => {
  // ✅ 필터 상태
  const [date, setDate] = useState("2018-08-23");
  const [hour, setHour] = useState("ALL"); // "00"~"23" 또는 "ALL"

  // ✅ 페이지네이션
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // ✅ 데이터 상태
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // ✅ 시간 옵션 00~23
  const hourOptions = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
  }, []);

  // ✅ URL 조립 함수
    const buildUrl = ({ selectedDate, selectedHour, start, end }) => {
        const KEY = "7866784663616977353052717a6a76";
        const yyyymmdd = toYYYYMMDD(selectedDate);

        const parts = [
            "http://openapi.seoul.go.kr:8088",
            KEY,
            "json",
            "SPOP_LOCAL_RESD_JACHI",
            String(start),
            String(end),
            yyyymmdd,
        ];

        if (selectedHour !== "ALL") parts.push(selectedHour);

        return parts.join("/") + "/";
    };

  const fetchPop = async () => {
    setLoading(true);
    setError("");

    try {
      const start = (page - 1) * pageSize + 1;
      const end = page * pageSize;

      const url = buildUrl({
        selectedDate: date,
        selectedHour: hour,
        start,
        end,
      });

      const res = await fetch(url);
      const data = await res.json();

      const root = data?.SPOP_LOCAL_RESD_JACHI;
      const list = root?.row ?? [];

      setTotalCount(root?.list_total_count ?? 0);
      setRows(list);
    } catch (e) {
      console.error(e);
      setError("데이터를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ date/hour/gu/page 바뀌면 자동 조회
  useEffect(() => {
    fetchPop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, hour, page]);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  // ✅ 필터 바꾸면 1페이지로
  const onChangeDate = (e) => {
    setDate(e.target.value);
    setPage(1);
  };

  const onChangeHour = (e) => {
    setHour(e.target.value);
    setPage(1);
  };


  return (
    <>
      <h3>서울 생활인구 데이터</h3>

      {/* ✅ 필터 UI */}
      <div className="dateForm">
        {loading && <span>로딩중...</span>}
        <label>
          날짜&nbsp;
          <input type="date" value={date} onChange={onChangeDate} />
        </label>

        <label>
          시간&nbsp;
          <select value={hour} onChange={onChangeHour}>
            <option value="ALL">전체</option>
            {hourOptions.map((h) => (
              <option key={h} value={h}>
                {h}시
              </option>
            ))}
          </select>
        </label>

        {error && <span style={{ color: "crimson" }}>{error}</span>}
      </div>

      {/* ✅ 테이블 */}
      <table className="tlist" style={{ marginTop: 12 }}>
        <thead>
          <tr>
            <th>No</th>
            <th>일자</th>
            <th>시간</th>
            <th>자치구</th>
            <th>총 생활인구</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((r, idx) => (
            <tr key={`${r.STDR_DE_ID}-${r.TMZON_PD_SE}-${r.ADSTRD_CODE_SE}-${idx}`}>
              <td>{(page - 1) * pageSize + (idx + 1)}</td>
              <td>{r.STDR_DE_ID}</td>
              <td>{r.TMZON_PD_SE}</td>
              <td>{guMap[r.ADSTRD_CODE_SE] ?? r.ADSTRD_CODE_SE}</td>
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

      {/* ✅ 페이지네이션 */}
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

export default Population;
