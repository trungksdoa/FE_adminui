import { Product } from './../api/product/product';
import { Users } from "./user"

export interface orderItems{
  id: number
  productItem: Product
  quantity: any
  productPrice: any
}

export interface Order {
  id: number
  orderItems: Array<orderItems>
  address:string
  userId: Users
  note:string
  status:number
}


export interface orderManagement extends Order {
   CreateAt: any;
  LastUpdated: any;
}
