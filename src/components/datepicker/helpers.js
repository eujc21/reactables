export function* range(begin, end, interval = 1){
  for (let i = begin; i <= end; i += interval) {
    let number = String(i)
    yield number.length === 1 ? '0' + i : i
  }
}