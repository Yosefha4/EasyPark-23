export class Parking {
  constructor(title, imageUri, address,desc, price,location,enterOwnerId) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.desc = desc;
    this.price = price;
    this.location = location;  //{ lat: 0.1421, lng:127.1256 }
    this.ownerParkingId = enterOwnerId,

    this.id = new Date().toString() + Math.random().toString();
  }
}
