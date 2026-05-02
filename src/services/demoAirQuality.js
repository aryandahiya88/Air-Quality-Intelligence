const demoCities = [
  { name: "Delhi", lat: 28.6139, lon: 77.209, state: "Delhi", country: "IN", aqi: 4 },
  { name: "Noida", lat: 28.5355, lon: 77.391, state: "Uttar Pradesh", country: "IN", aqi: 4 },
  { name: "Gurugram", lat: 28.4595, lon: 77.0266, state: "Haryana", country: "IN", aqi: 3 },
  { name: "Ghaziabad", lat: 28.6692, lon: 77.4538, state: "Uttar Pradesh", country: "IN", aqi: 5 },
  { name: "Faridabad", lat: 28.4089, lon: 77.3178, state: "Haryana", country: "IN", aqi: 4 },
  { name: "Greater Noida", lat: 28.4744, lon: 77.504, state: "Uttar Pradesh", country: "IN", aqi: 3 },
  { name: "Sonipat", lat: 28.9931, lon: 77.0151, state: "Haryana", country: "IN", aqi: 3 },
  { name: "Rohtak", lat: 28.8955, lon: 76.6066, state: "Haryana", country: "IN", aqi: 2 },
  { name: "Meerut", lat: 28.9845, lon: 77.7064, state: "Uttar Pradesh", country: "IN", aqi: 4 }
];

function buildComponents(aqi) {
  const multiplier = Math.max(1, aqi);

  return {
    co: 360 + multiplier * 280,
    no: 1.4 + multiplier * 0.9,
    no2: 18 + multiplier * 13,
    o3: 22 + multiplier * 10,
    so2: 5 + multiplier * 4,
    pm2_5: 14 + multiplier * 27,
    pm10: 36 + multiplier * 46,
    nh3: 3 + multiplier * 3.5
  };
}

export function getDemoCoordinates(query) {
  const normalizedQuery = query.trim().toLowerCase();
  const matches = demoCities.filter((city) => city.name.toLowerCase().includes(normalizedQuery));

  return (matches.length ? matches : demoCities.slice(0, 3)).map((city) => ({
    name: city.name,
    lat: city.lat,
    lon: city.lon,
    state: city.state,
    country: city.country
  }));
}

export function getDemoAirQuality(lat, lon) {
  const city =
    demoCities.find((item) => Math.abs(item.lat - Number(lat)) < 0.01 && Math.abs(item.lon - Number(lon)) < 0.01) ||
    demoCities[0];

  return {
    coord: { lat: city.lat, lon: city.lon },
    list: [
      {
        main: { aqi: city.aqi },
        components: buildComponents(city.aqi),
        dt: Math.floor(Date.now() / 1000)
      }
    ]
  };
}
