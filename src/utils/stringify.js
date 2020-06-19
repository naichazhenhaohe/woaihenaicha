const stringify = (data = {}) => {
  const len = Object.keys(data).length
  let res = ''
  if (len <= 0) {
    return res
  }
  for (let item of Object.entries(data)) {
    res += `${item[0]}=${item[1]}&`
  }
  return res.substring(0, res.length - 1)
}

const parse = (search = '') => {
  const res = {}
  if (search) {
    const options = decodeURI(search.substring(1)).split('&')
    for (let option of options) {
      const entry = option.split('=')
      res[entry[0]] = entry[1]
    }
  }
  return res
}

export { stringify, parse }
