import React, { useState } from "react";
import dayjs from "dayjs";
import CalendarHeader from "./CalendarHeader/CalendarHeader";
import CalendarBody from "./YearDate";
import MonthDate from "./MonthDate";
import WeekDate from "./WeekDate";
import DayTime from "./DayTime";

const Calendar = () => {
  const [selectedDateType, setSelectedDateType] = useState("Day");
  const [currentDate, setCurrentDate] = useState(dayjs());

  const handleDateNavigation = (direction) => {
    const units = {
      Day: "day",
      Week: "week",
      Month: "month",
      Year: "year",
    };

    const operation = direction === "prev" ? "subtract" : "add";

    setCurrentDate((prevDate) =>
      prevDate[operation](1, units[selectedDateType])
    );
  };

  return (
    <>
      <CalendarHeader
        selectedDateType={selectedDateType}
        setSelectedDateType={setSelectedDateType}
        currentDate={currentDate}
        handleDateNavigation={handleDateNavigation}
      />
      <div style={{ padding: "10px" }}>
        {selectedDateType == "Day" ? (
          <DayTime currentDate={currentDate} />
        ) : selectedDateType == "Week" ? (
          <WeekDate currentDate={currentDate} />
        ) : selectedDateType == "Month" ? (
          <MonthDate currentDate={currentDate} />
        ) : selectedDateType == "Year" ? (
          <CalendarBody currentDate={currentDate} />
        ) : null}
      </div>
    </>
  );
};
export default Calendar;
