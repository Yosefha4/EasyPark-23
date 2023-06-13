import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import ClockTimerCount from "../../components/parkings/ClockTimerCount"
import { useNavigation } from "@react-navigation/native";

jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

describe("Clock", () => {
  it("should render the availability correctly", async () => {
    const matchArrayList = [
      {
        isBusy: false,
        availDays: {
          whichDay: "Sunday",
          fromTime: "10:00",
          untilTime: "18:00",
        },
      },
      {
        isBusy: true,
        availDays: {
          whichDay: "Monday",
          fromTime: "09:00",
          untilTime: "17:00",
        },
      },
    ];

    const { getByText } = render(
      <ClockTimerCount matchArrayList={matchArrayList} isMatchId={true} />
    );

    await waitFor(() => {
      const availableDay1 = getByText("זמינות החניה");

      expect(availableDay1).toBeTruthy();
    });
  });

  it("should render the unavailable message when isMatchId is false", () => {
    const matchArrayList = [
      {
        isBusy: false,
        availDays: {
          whichDay: "Sunday",
          fromTime: "10:00",
          untilTime: "18:00",
        },
      },
      {
        isBusy: true,
        availDays: {
          whichDay: "Monday",
          fromTime: "09:00",
          untilTime: "17:00",
        },
      },
    ];

    const { getByText } = render(
      <ClockTimerCount matchArrayList={matchArrayList} isMatchId={false} />
    );

    const unavailableMessage = getByText("מצטערים ... חניה זו אינה זמינה כרגע");

    expect(unavailableMessage).toBeTruthy();
  });
});
