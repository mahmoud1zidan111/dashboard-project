import { useCallback } from "react";
import useFetch from "./useFetch";

export default function useDetails(fetchDetails, id) {
  const fetchItem = useCallback(() => fetchDetails(id), [fetchDetails, id]);
  return useFetch(fetchItem);
}
