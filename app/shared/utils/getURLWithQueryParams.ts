export const getURLWithQueryParams = (
  baseUrl: string,
  params: Record<string, any>,
) => {
  const query = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&')

  return `${baseUrl}?${query}`
}
