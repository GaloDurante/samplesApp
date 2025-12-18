import { useEffect, useState } from "react";

export function useClientSearch(query: string) {
  const [data, setData] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);
      const res = await window.clientApi.search(query);
      if (!cancelled) {
        setData(res);
        setLoading(false);
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [query]);

  return { data, loading };
}
