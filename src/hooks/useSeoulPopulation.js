import { useEffect, useState } from "react";

const toYYYYMMDD = (v) => v.replaceAll("-", "");

export const useSeoulPopulation = ({ date, hour, page, pageSize }) => {
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPop = async () => {
      setLoading(true);
      setError("");

      try {
        const KEY = "7866784663616977353052717a6a76"; // ✅ 너 키로 바꿔
        const yyyymmdd = toYYYYMMDD(date);

        const start = (page - 1) * pageSize + 1;
        const end = page * pageSize;

        const parts = [
          "http://openapi.seoul.go.kr:8088",
          KEY,
          "json",
          "SPOP_LOCAL_RESD_JACHI",
          start,
          end,
          yyyymmdd,
        ];

        if (hour !== "ALL") parts.push(hour);

        const url = parts.join("/") + "/";

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
  }, [date, hour, page, pageSize]);

  return { rows, totalCount, loading, error };
};
