export function getAqiLabel(aqi) {
  const labels = {
    1: "Good",
    2: "Fair",
    3: "Moderate",
    4: "Poor",
    5: "Very Poor"
  };
  return labels[aqi] || "Unknown";
}

export function getRiskScore(aqi, components = {}) {
  const pm25Pressure = Math.min(40, ((components.pm2_5 || 0) / 120) * 40);
  const pm10Pressure = Math.min(25, ((components.pm10 || 0) / 220) * 25);
  const gasPressure = Math.min(20, (((components.no2 || 0) + (components.so2 || 0) + (components.o3 || 0)) / 260) * 20);
  const aqiPressure = Math.min(15, aqi * 3);
  return Math.round(pm25Pressure + pm10Pressure + gasPressure + aqiPressure);
}

export function getHealthAdvice(aqi, userGroup = "general") {
  const advice = {
    1: "Air quality is good. Outdoor activities are suitable.",
    2: "Air quality is acceptable. Sensitive users should watch for symptoms.",
    3: "Reduce prolonged outdoor exertion, especially near heavy traffic.",
    4: "Avoid heavy outdoor exercise. Use a mask if travel is necessary.",
    5: "Stay indoors where possible. Use air purifier support and avoid exposure."
  };

  const groupAdvice = {
    asthma: " Keep inhalers accessible and avoid outdoor exertion.",
    elderly: " Prefer indoor activity and avoid peak traffic hours.",
    children: " Limit outdoor play and school sports during high AQI periods.",
    workers: " Use protective masks and schedule breaks away from polluted roads.",
    general: ""
  };

  return `${advice[aqi] || advice[3]}${aqi >= 3 ? groupAdvice[userGroup] || "" : ""}`;
}

export function getActionPlan(aqi) {
  if (aqi <= 2) {
    return ["Outdoor activity is acceptable", "Keep windows open during low-traffic hours", "Continue routine monitoring"];
  }

  if (aqi === 3) {
    return ["Reduce long outdoor exercise", "Prefer public transport or carpooling", "Monitor PM2.5 and PM10 trends"];
  }

  if (aqi === 4) {
    return ["Use N95 mask outdoors", "Avoid jogging near roads", "Run air purifier in sleeping area"];
  }

  return ["Stay indoors where possible", "Avoid outdoor sports", "Use purifier support and keep medicines accessible"];
}

export function normalizeAirQualityResponse(city, response) {
  const current = response?.list?.[0];
  const components = current?.components || {};
  const aqi = current?.main?.aqi || 0;

  return {
    ...city,
    aqi,
    components,
    riskScore: getRiskScore(aqi, components),
    trend: buildTrend(aqi, components),
    timestamp: current?.dt ? current.dt * 1000 : Date.now()
  };
}

export function getDominantPollutant(components = {}) {
  const entries = Object.entries(components);
  if (!entries.length) return "N/A";
  return entries.sort((a, b) => b[1] - a[1])[0][0].toUpperCase();
}

export function buildTrend(aqi, components = {}) {
  const basePm25 = components.pm2_5 || 30;
  const basePm10 = components.pm10 || 80;
  const hours = ["Now", "+2h", "+4h", "+6h", "+8h", "+10h"];

  return hours.map((hour, index) => {
    const cycle = Math.sin(index * 0.85) * 0.12;
    const traffic = index >= 2 && index <= 4 ? 0.1 : -0.04;
    const factor = 1 + cycle + traffic;

    return {
      hour,
      aqi: Math.max(1, Math.min(5, Math.round(aqi + (factor > 1.12 ? 1 : factor < 0.94 ? -1 : 0)))),
      pm25: Number((basePm25 * factor).toFixed(1)),
      pm10: Number((basePm10 * (factor + 0.04)).toFixed(1))
    };
  });
}
