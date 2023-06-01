"use client";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
const useCache = () => {
  const [cache, setCache] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    const storage = localStorage.getItem("cache");
    setCache(storage ? JSON.parse(storage) : []);
    enqueueSnackbar(`Cache: ${JSON.stringify(cache)}`);
  }, [cache, enqueueSnackbar]);

  return { cache, setCache };
};

export default useCache;
