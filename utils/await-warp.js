export const awaitWrap = (p) => {
  return p
    .then((res) => {
      return [null, res]
    })
    .catch((err) => {
      return [err, null]
    })
}
