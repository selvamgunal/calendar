import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { Time, fromToEndDate } from "./CalendarData/CalendarData";
import "./DayTime.css";
import MeetingBox from "./Component/Meeting/MeetingBox";

dayjs.extend(isBetween);

const DayTime = ({ currentDate }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const processTimeData = () => {
      const processedData = Time.map((item) => {
        let current = dayjs(currentDate).format("YYYY-MM-DD");
        const start = dayjs(`${current} ${item}`, "hh:mm A").unix();
        const end = dayjs.unix(start).add(59, "minute").unix();

        const filteredEvents = fromToEndDate.filter((ele) => {
          const eventStart = dayjs(ele.start, "YYYY-MM-DD h:mm A").unix();
        
          return eventStart >= start && eventStart <= end;
        });
        

        return {
          id: item,
          time: item,
          start,
          end,
          events: filteredEvents,
        };
      });

      setData(processedData);
    };

    processTimeData();
  }, [currentDate, Time, fromToEndDate]);

  return (
    <div className="day-time-column-container">
      <div className="day-time-left-column">
        {Time.map((item, i) => (
          <div className="day-time-cell" key={i}>
            {item}
          </div>
        ))}
      </div>

      <div className="day-time-right-column">
        {data.map((time, index) => (
          <div key={index} className="day-time-row">
            {time.events.length > 0 ? (
              <MeetingBox meeting={time.events} />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayTime;
