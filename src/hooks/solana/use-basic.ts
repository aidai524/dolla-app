import useProgram from "./use-program";
import { loadSbProgram } from "./helpers";
import { useEffect, useRef, useState } from "react";

export default function useBasicInfo() {
  const { provider } = useProgram();
  const [loading, setLoading] = useState(false);

  const sbProgramRef = useRef<any>(null);

  useEffect(() => {
    const fetchBasicInfo = async () => {
      setLoading(true);
      const sbProgram = await loadSbProgram(provider);
      setLoading(false);
      sbProgramRef.current = sbProgram;
    };
    fetchBasicInfo();
  }, []);

  return {
    sbProgramRef,
    loading
  };
}
