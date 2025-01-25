import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { fromToEndDate, Time } from "./CalendarData/CalendarData"; // Assuming Time is an array of time slots
import "./WeekDate.css";
import MeetingBox from "./Component/Meeting/MeetingBox";
import { getHourlyUnixTimestamps,getStartOfWeek } from "./Commonfunction/Commonfunction";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);


const getWeekDays = (startDate) => {
  const events = [];
  const unixHourPerDay = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = startDate.add(i, "day").startOf("day");

    const hourlyTimestamps = getHourlyUnixTimestamps(currentDate);
    if (!hourlyTimestamps || hourlyTimestamps.length !== 24) {
      console.warn(
        `Hourly timestamps for day ${i} are invalid`,
        hourlyTimestamps
      );
    }
    unixHourPerDay.push(hourlyTimestamps);

    const dayObject = {
      id: i,
      currentDate: currentDate.unix(),
      start: currentDate.format("DD MMM dddd"),
    };

    const dayEvents = fromToEndDate.filter((event) => {
      const eventStart = dayjs(event.start);

      return (
        eventStart.isValid() &&
        eventStart.isBetween(currentDate, currentDate.endOf("day"), null, "[]")
      );
    });

    if (dayEvents.length > 0) {
      dayObject.events = dayEvents;
    }

    events.push(dayObject);
  }

  return { events, unixHourPerDay };
};

const WeekDate = (props) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(
    getStartOfWeek(props.currentDate)
  );
  const [weekData, setWeekData] = useState(getWeekDays(currentWeekStart));
  const [finalData, setFinalData] = useState([]);
  const { events: weekDays, unixHourPerDay } = weekData;

  useEffect(() => {
    const startOfWeek = getStartOfWeek(props.currentDate);
    setCurrentWeekStart(startOfWeek);
    const newWeekData = getWeekDays(startOfWeek);
    setWeekData(newWeekData);
  }, [props.currentDate]);

  useEffect(() => {
    if (weekData && weekData.unixHourPerDay) {
      frameData(weekData.unixHourPerDay);
    }
  }, [weekData]);

  const frameData = (allList) => {
    const result = [];

    for (let i = 0; i < 24; i++) {
      const eachRow = [];

      allList.forEach((item, index) => {
        if (!item || !item[i]) {
          console.warn(`Item at index ${index} or hour ${i} is undefined`);
          return;
        }

        const obj = item[i];
        const start = obj?.startUnix;
        const end = obj?.endUnix;

        const events = fromToEndDate.filter((day) => {
          const startDate = dayjs(day.start).unix();
          return startDate >= start && startDate <= end;
        });

        obj["events"] = events;
        eachRow.push(obj);
      });

      result.push(eachRow);
    }

    setFinalData(result);
  };

  return (
    <div className="week-grid">
      <div className="week-time-column">
        <div className="week-time-cell"></div>
        {Time.map((t, index) => (
          <div key={index} className="week-time-cell">
            {t}
          </div>
        ))}
      </div>

      <div className="week-days-columns">
        <div className="week-header-row">
          {weekDays &&
            weekDays.map((day, index) => (
              <div key={index} className="week-cell week-header-cell">
                {day.start}
              </div>
            ))}
        </div>

        {finalData.map((itemkey, timeIndex) => (
          <div key={timeIndex} className="week-row">
            {itemkey.map((day, dayIndex) => (
              <div key={dayIndex} className="week-cell">
                {day.events?.length > 0 ? (
                  <MeetingBox meeting={day.events} />
                ) : null}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekDate;
