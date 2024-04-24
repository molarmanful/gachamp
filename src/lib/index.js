import { persisted } from 'svelte-persisted-store'

export { default as Input } from './Input.svelte'
export { default as BgImg } from './BgImg.svelte'

export const user = persisted('gachamp-user', {})

export const getAge = d =>
  new Date(new Date() - new Date(d)).getFullYear() - 1970

export const commaNum = n => (n + '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export const msToMin = n => {
  let d = new Date(n)
  return d.getMinutes() + ':' + (d.getSeconds() + '').padStart(2, '0')
}
