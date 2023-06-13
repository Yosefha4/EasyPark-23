export class Users {
  constructor(userEmail, userToken) {
    this.userEmail = userEmail;
    this.userToken = userToken;
    this.id = new Date().toString() + Math.random().toString();

    // Add flag to check parking requests .
  }
}
