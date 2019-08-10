export function encodeQuery(queryObject) {
  return Object.entries(queryObject)
  .filter(([key, value]) => typeof value !== 'undefined')
  .map(([key, value]) => encodeURIComponent(key) + (value != null ? '=' + encodeURIComponent(value) : ''))
  .join('&')
}