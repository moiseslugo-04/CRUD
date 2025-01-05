export type UserId = string

export interface User {
  id: UserId
  name: string
  email: string
  github: string
}

export type UpdateUser = Partial<User>
export enum Methods {
  'DELETE',
  'UPDATE',
  'CREATE',
}
export interface RollbackInterface extends User {
  method: Methods
}
