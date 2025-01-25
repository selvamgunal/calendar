import React, { useEffect, useState } from "react";
import "./CalendarHeader.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { dateType } from "../CalendarData/CalendarData";
import { getWeekRange } from "../Commonfunction/Commonfunction";

dayjs.extend(advancedFormat);

const CalendarHeader = ({
  selectedDateType,
  setSelectedDateType,
  currentDate,
  handleDateNavigation,
}) => {
  const [displayDate, setDisplayDate] = useState(null);

  useEffect(() => {
    dateFormat(currentDate);
  }, [selectedDateType, currentDate]);

  const dateFormat = (date) => {
    if (selectedDateType === "Day") {
      setDisplayDate(date.format("D MMMM YYYY"));
    } else if (selectedDateType === "Month") {
      setDisplayDate(date.format("MMMM YYYY"));
    } else if (selectedDateType === "Week") {
      setDisplayDate(getWeekRange(date));
    } else if (selectedDateType === "Year") {
      setDisplayDate(date.format("YYYY"));
    }
  };

  return (
    <div className="calendor-header">
      <div className="flex-content">
        <div style={{ marginRight: "10px" }}>
          <ArrowBackIosNewIcon onClick={() => handleDateNavigation("prev")} />
        </div>
        <div>
          <ArrowForwardIosIcon onClick={() => handleDateNavigation("next")} />
        </div>
      </div>
      <div className="date-align">{displayDate}</div>
      <div className="flex-content">
        {dateType.map((item) => (
          <div
            key={item}
            className={
              item === selectedDateType
                ? "underline datetype-align"
                : "datetype-align"
            }
            onClick={() => setSelectedDateType(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarHeader;
