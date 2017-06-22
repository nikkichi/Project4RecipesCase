import * as Models from './generated_models'
import * as Immutable from 'immutable'
import 'whatwg-fetch'

export async function ping() : Promise<void> {
  let res = await fetch(`/api/v1/keep_alive/ping`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}
export async function ping_as_User() : Promise<void> {
  let res = await fetch(`/api/v1/keep_alive/ping_as_User`, { method: 'get', credentials: 'include', headers:{'content-type': 'application/json'} })
  if (!res.ok) throw Error(res.statusText)
  return
}
