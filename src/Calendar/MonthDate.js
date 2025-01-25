import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween"; // Import the isBetween plugin
import { fromToEndDate, WeekDay } from "./CalendarData/CalendarData";
import "./MonthDate.css";
import MeetingBox from "./Component/Meeting/MeetingBox";

dayjs.extend(isBetween);

const Calendar = (props) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf("month"));

  useEffect(() => {
    setCurrentMonth(props.currentDate);
  }, [props.currentDate]);

  const getMonthDates = (month, eventsData = []) => {
    const firstDayOfMonth = month.startOf("month");
    const firstDayOfWeek = (firstDayOfMonth.day() + 6) % 7;
    const lastDayOfMonth = month.endOf("month");
    const lastDate = lastDayOfMonth.date();
  
    const body = [];
    let dayCounter = 1;
  
    const firstRow = new Array(7).fill(null).map((_, index) => {
      if (index >= firstDayOfWeek) {
        const currentDate = dayCounter++;
        return {
          id: currentDate,
          date: currentDate,
          events: fromToEndDate.filter(event => {
            const eventStartDate = dayjs(event.start);
            const eventEndDate = dayjs(event.end);
            const currentDateStart = dayjs(props.currentDate)
              .startOf('month')
              .date(currentDate)
              .startOf('day');
            const currentDateEnd = currentDateStart.endOf('day');
  
            return eventStartDate.isBetween(currentDateStart, currentDateEnd, null, '[)');
          }),
        };
      }
      return null;
    });
  
    body.push(firstRow);
  
    while (dayCounter <= lastDate) {
      const weekRow = new Array(7).fill(null).map(() => {
        if (dayCounter <= lastDate) {
          const currentDate = dayCounter++;
          return {
            id: currentDate,
            date: currentDate,
            events: fromToEndDate.filter(event => {
              const eventStartDate = dayjs(event.start);
              const eventEndDate = dayjs(event.end);
              const currentDateStart = dayjs(props.currentDate)
                .startOf('month')
                .date(currentDate)
                .startOf('day');
              const currentDateEnd = currentDateStart.endOf('day');
  
              return eventStartDate.isBetween(currentDateStart, currentDateEnd, null, '[)');
            }),
          };
        }
        return null;
      });
  
      body.push(weekRow);
    }
  
    return body;
  };
  
  const body = getMonthDates(currentMonth); 

  return (
    <div>
      <div className="month-row">
        {WeekDay.map((day) => (
          <div key={day} className="month-cell header">
            {day}
          </div>
        ))}
      </div>

      <div className="month-body">
        {body.map((week, weekIndex) => (
          <div key={weekIndex} className="month-row">
            {week.map((date, dateIndex) =>
              date ? (
                <div key={dateIndex} className="month-cell">
                  {date.events.length > 0 ? "" : date.id}
                  {date.events.length > 0 ? <MeetingBox meeting={date.events}/> : null}
                </div>
              ) : (
                <div key={dateIndex} className="month-cell empty"></div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
