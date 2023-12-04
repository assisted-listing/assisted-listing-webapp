import { Timestamp } from "rxjs"

export interface Checkout {
    checkoutID: string
    listing: string
    userID: string
    paid: boolean
    createTS: string
    paidTS: string
  }