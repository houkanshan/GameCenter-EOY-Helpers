function stringifyUrlQueryParam(param) {
  if (
    typeof param === 'string' ||
    (typeof param === 'number' && !isNaN(param)) ||
    typeof param === 'boolean'
  ) {
    return String(param)
  } else {
    return ''
  }
}

export function urlQueryToSearchParams(urlQuery) {
  const result = new URLSearchParams()
  Object.entries(urlQuery).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => result.append(key, stringifyUrlQueryParam(item)))
    } else {
      result.set(key, stringifyUrlQueryParam(value))
    }
  })
  return result
}