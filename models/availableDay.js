export class AvailableDay {
    constructor(matchOwnerId, fromTime,untilTime, whichDay,isBusy,rentBy) {
      this.availDays = {
            fromTime : fromTime,
            untilTime:untilTime,
            whichDay:whichDay
        }
      this.matchOwnerId = matchOwnerId;
      this.isBusy = isBusy ;
      this.rentBy = rentBy;
    //   this.fromTime = fromTime;
    //   this.untilTime = untilTime;
    //   this.whichDay = whichDay;

      this.id = new Date().toString() + Math.random().toString();
    }
  }
  