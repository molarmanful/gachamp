import { persisted } from 'svelte-persisted-store'

export { default as Input } from './Input.svelte'

export const user = persisted('gachamp-user', {})

export const getAge = d =>
  new Date(new Date() - new Date(d)).getFullYear() - 1970
