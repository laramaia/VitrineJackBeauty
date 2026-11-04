import { useState, useEffect } from "react";

export function useColumns() {
 const get = () =>
  window.innerWidth >= 1024 ? 4 :
  window.innerWidth >= 640 ? 2 :
  window.innerWidth >= 480 ? 2 : 1;
  const [cols, setCols] = useState(get);
  useEffect(() => {
    const onResize = () => setCols(get());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return cols;
}