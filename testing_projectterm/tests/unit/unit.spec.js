/* eslint-disable no-undef */
import loginService from '../../src/views/loginService'
import krapookService from '../../src/views/krapookService'
describe('krapook', () => {
  it('krapook moneyUser >= moneyFrom', () => {
    const moneyUser = 300
    const moneyFrom = 300
    const krapook = krapookService.moneyWithdraw(moneyUser, moneyFrom)
    expect(krapook).toBe(true)
  })
  it('krapook moneyUser < moneyFrom', () => {
    const moneyUser = 100
    const moneyFrom = 300
    const krapook = krapookService.moneyWithdraw(moneyUser, moneyFrom)
    expect(krapook).toBe(false)
  })
})

// eslint-disable-next-line no-undef
describe('login', () => {
  it('login username and password not null', () => {
    const username = 'admin'
    const password = 'admin'
    const login = loginService.checkNullUsernameAndPasseord(username, password)
    expect(login).toBe(false)
  })
  it('login username null', () => {
    const username = ''
    const password = 'admin'
    const login = loginService.checkNullUsernameAndPasseord(username, password)
    expect(login).toBe(true)
  })
  it('login password null', () => {
    const username = 'admin'
    const password = ''
    const login = loginService.checkNullUsernameAndPasseord(username, password)
    expect(login).toBe(true)
  })
  it('login username and password is null', () => {
    const username = ''
    const password = ''
    const login = loginService.checkNullUsernameAndPasseord(username, password)
    expect(login).toBe(true)
  })
  it('login return data null', () => {
    const data = null
    const login = loginService.checkNull(data)
    expect(login).toBe(true)
  })
  it('login return data', () => {
    const data = {
      _id: '5e8c515140c2db3274da2985',
      firstname: 'thee',
      lastname: 'nugu',
      username: 'admin001',
      password: 'admin001',
      __v: 0
    }
    const login = loginService.checkNull(data)
    expect(login).toBe(false)
  })
})
