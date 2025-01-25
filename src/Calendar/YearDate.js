import './YearDate.css';
import { Months, fromToEndDate } from './CalendarData/CalendarData';
import dayjs from 'dayjs';
import MeetingBox from './Component/Meeting/MeetingBox';
import { checkEventInMonth } from './Commonfunction/Commonfunction';


const CalendarBody = ({ currentDate }) => {
  const currentYear = dayjs(currentDate).year(); 
  const currentMonth = dayjs(currentDate).month(); 

  return (
    <div className="year-row">
      {Months.map((item, index) => {
        const eventsInMonth = checkEventInMonth(fromToEndDate, index, currentYear);

        const isCurrentMonth = index === currentMonth;
        
        return (
          <div key={index} className={eventsInMonth.length > 0 ? 'year-cell-current-month' : 'year-cell'}>
            <div>{item}</div>
            <div style={{width:"60%"}}>
            {eventsInMonth.length > 0 && (
              <div className="events-list">
               <div key={index} >
            <div>{ <MeetingBox meeting={eventsInMonth}/>}</div>
          </div>
              </div>
            )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CalendarBody;
