export class Parking {
  constructor(
  
    imageUri,
    address,
    desc,
    price,
    location,
    enterOwnerId,
    isConfirm,
    ownerName,
    ownerEmail,
    parkingID
  ) {

    this.imageUri = imageUri;
    this.address = address;
    this.desc = desc;
    this.price = price;
    this.location = location; //{ lat: 0.1421, lng:127.1256 }
    this.ownerParkingId = enterOwnerId;

    this.ownerName = ownerName;
    this.ownerEmail = ownerEmail;
    this.isConfirm = false;

    this.id = new Date().toString() + Math.random().toString();
    this.parkingID = parkingID;
    // Add flag to check parking requests .
  }
}
