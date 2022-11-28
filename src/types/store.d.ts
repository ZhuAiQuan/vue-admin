declare namespace Store {
  interface UserState extends Login.UserInfo {
    token: string
  }
}