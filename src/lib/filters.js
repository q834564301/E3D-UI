// 文件大小单位转换  m g ->  size: number
function sizeFormat(size) {
  if (!size) { return '-' }
  const kb = size / 1024
  const m = kb / 1024
  const g = m / 1024
  let result = size
  if (kb > 1024) {
    if (m > 1024) {
      result = g.toFixed(2)
      return `${result} GB`
    } else {
      result = m.toFixed(2)
      return `${result} MB`
    }
  } else {
    result = kb.toFixed(2)
    return `${result} KB`
  }
}

// 格式化日期 -> date: 时间戳 (: number)
function dateFormat(date) {
  if (!date) return '-'
  const time = new Date(date)
  let ret = ''
  const y = time.getFullYear()
  const m = (time.getMonth() + 1 + '').padStart(2, '0')
  const d = (time.getDate() + '').padStart(2, '0')
  const h = (time.getHours() + '').padStart(2, '0')
  const mi = (time.getMinutes() + '').padStart(2, '0')
  ret = `${y}-${m}-${d}   ${h}:${mi}`
  return ret
}

export {
  sizeFormat,
  dateFormat
}
