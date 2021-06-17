const dataInit = {loading: true}

const dataEffect = (token, index, setData) => {
  let ignore = false

  if (token.data != null) {
    index(token.data).then(result => {
      if (ignore) return

      if (result.hasOwnProperty("error")) {
        setData({error: result.error})
      } else {
        setData({data: result})
      }
    })
  }

  return () => {
    ignore = true;
  }
}

export {dataInit, dataEffect}