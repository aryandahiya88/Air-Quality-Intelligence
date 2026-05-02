export function formatDateTime(value) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

export function formatPollutant(value) {
  if (value === undefined || value === null) return "N/A";
  return `${Number(value).toFixed(1)} ug/m3`;
}
