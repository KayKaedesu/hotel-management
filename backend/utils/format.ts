export function dateTimeFormat(date: Date) {
  return new Date(date).toISOString().slice(0, 19).replace('T', ' ')
}

export function dateFormat(date: Date) {
  return new Date(date).toISOString().slice(0, 10)
}
