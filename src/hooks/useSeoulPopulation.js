import { useEffect, useState } from "react";

const toYYYYMMDD = (v) => v.replaceAll("-", "");

export const useSeoulPopulation = ({ date, hour, page, pageSize, guCode }) => {
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPop = async () => {
      setLoading(true);
      setError("");

      try {
        const KEY = "7866784663616977353052717a6a76";
        const yyyymmdd = toYYYYMMDD(date);

        const start = (page - 1) * pageSize + 1;
        const end = page * pageSize;

        // ✅ 1) 서울 API로 보낼 path를 만든다 (http://openapi.seoul.go.kr:8088/ 뒤에 붙을 부분)
        const pathParts = [
          KEY,
          "json",
          "SPOP_LOCAL_RESD_JACHI",
          start,
          end,
          yyyymmdd,
          hour,
          guCode
        ];

        const path = pathParts.join("/") + "/";

        // ✅ 2) Vercel 프록시 주소로 요청한다
        const PROXY_BASE = "https://recall-one-zeta.vercel.app/api/seoul";
        const url = `${PROXY_BASE}?path=${encodeURIComponent(path)}`;

        const res = await fetch(url);
        const data = await res.json();

        const root = data?.SPOP_LOCAL_RESD_JACHI;
        setTotalCount(root?.list_total_count ?? 0);
        setRows(root?.row ?? []);
      } catch (e) {
        console.error(e);
        setError("데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchPop();
  }, [date, hour, page, pageSize, guCode]);

  return { rows, totalCount, loading, error };
};
