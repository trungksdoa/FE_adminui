export class Users {
  public id: number
  public name: String
  public username: String
  public password: String
  public address: String
  public phone: String
  public isAdmin: boolean
  public CreateAt: any;
  public LastUpdated: any;
  constructor (
    id: number,
    name: String,
    username: String,
    password: String,
    address: String,
    phone: String,
    CreateAt: any,
    LastUpdated: any,
  ) {
    this.id = id
    this.name = name
    this.username = username
    this.password = password
    this.address = address
    this.phone = phone
    this.CreateAt=CreateAt
    this.LastUpdated=LastUpdated
  }
}
