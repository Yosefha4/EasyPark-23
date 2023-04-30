export class AvailableDay {
    constructor(matchOwnerId, fromTime,untilTime, whichDay) {
      this.availDays = {
            fromTime : fromTime,
            untilTime:untilTime,
            whichDay:whichDay
        }
      this.matchOwnerId = matchOwnerId;
    //   this.fromTime = fromTime;
    //   this.untilTime = untilTime;
    //   this.whichDay = whichDay;

      this.id = new Date().toString() + Math.random().toString();
    }
  }
  