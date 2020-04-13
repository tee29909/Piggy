const loginService = {
  checkNull: function (data) {
    return data === null
  },
  checkNullUsernameAndPasseord: function (username, password) {
    return username.length < 1 || password.length < 1
  }
}

export default loginService
