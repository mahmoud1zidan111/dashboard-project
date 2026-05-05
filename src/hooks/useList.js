import useFetch from "./useFetch";

export default function useList(fetchList) {
  return useFetch(fetchList, [fetchList]);
}
