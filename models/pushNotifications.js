export class PushNotification {
  constructor(userIDToken, pushToken) {
    this.userIDToken = userIDToken;
    this.pushToken = pushToken;

    this.id = new Date().toString() + Math.random().toString();

    // Add flag to check parking requests .
  }
}
