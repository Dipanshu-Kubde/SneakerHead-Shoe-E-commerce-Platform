import { useEffect, useState } from "react";
import axios from "axios";

export default function useProductSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchAndFilter = async () => {
      if (query.length < 1) return setResults([]);

      try {
        const { data } = await axios.get("http://localhost:8080/api/products");
        const filtered = data.filter(p =>
          p?.name?.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
      } catch (err) {
        console.error("Search fetch failed", err);
        setResults([]);
      }
    };

    fetchAndFilter();
  }, [query]);

  return { query, setQuery, results };
}
