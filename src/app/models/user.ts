export interface User {
    email: string
    sub: string
  }

export interface UserDtl {
  email: string,
  listingsRemaining: number, 
  stripeCustID: string,
  subscribedFlag: boolean,
  subscriptionID: string, 
  subscriptionType: string
  userID: string
}