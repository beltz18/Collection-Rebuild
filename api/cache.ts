export const CACHE_KEYS = {

}

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch'
export const METHODS: Record<HttpMethod, HttpMethod> = {
  get: 'get',
  post: 'post',
  put: 'put',
  delete: 'delete',
  patch: 'patch',
}

export const ROUTES = {
  login: '/login/',
}