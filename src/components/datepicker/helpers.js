export function* range(begin, end, interval = 1){
  for (let i = begin; i <= end; i += interval) {
    let number = String(i)
    yield number.length === 1 ? '0' + i : i
  }
}

export function convertHours(hour, period){
  hour = parseInt(hour)
  hour = hour === 12 ? 0: hour
  hour = period === 'PM' ? hour + 12 : hour
  return hour
}

export function appendTime(date, time){
  date = date.hours(time.hours())
  date = date.minutes(time.minutes())
  return date
}