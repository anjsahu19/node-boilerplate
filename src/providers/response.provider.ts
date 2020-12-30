import { response } from 'express'

declare module 'express-serve-static-core' {
  export interface Response {
    success(responseBody: any): this
    failure(responseBody: any): this
  }
}

response.success = function (resBody: any) {
  if (resBody.error) {
    return this.failure(resBody)
  }
  resBody.error = false
  resBody.status = resBody.status != undefined ? resBody.status : 200
  resBody.data = resBody.data != undefined ? resBody.data : []

  return this.status(resBody.status).json(resBody)
}

response.failure = function (resBody: any) {
  resBody.error = true
  resBody.status = resBody.status != undefined ? resBody.status : 400
  resBody.message = resBody.message != undefined ? resBody.message : ''

  return this.status(resBody.status).json(resBody)
}

export default class ResponseProvider {
  static init() {}
}
