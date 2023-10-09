export function getUidToken() {
  return localStorage.getItem('UidToken')
}

export function setUidToken(Uid) {
  localStorage.setItem('UidToken', Uid)
}
