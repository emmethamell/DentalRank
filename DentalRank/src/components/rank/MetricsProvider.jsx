import React, { useState } from "react";
import MetricsContext from "./MetricsContext";

const MetricsProvider = ({ children }) => {
  const [metrics, setMetrics] = useState({});

  const updateMetrics = (key, min, max) => {
    setMetrics((prevMetrics) => ({
      ...prevMetrics,
      [key]: { min, max },
    }));
  };
  return (
    <MetricsContext.Provider value={{ metrics, updateMetrics }}>
      {children}
    </MetricsContext.Provider>
  );
};

export default MetricsProvider;
