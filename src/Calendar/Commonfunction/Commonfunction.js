const dayjs = require('dayjs');

export const getHourlyUnixTimestamps = (dateStr) => {
  const startDate = dayjs(dateStr); // Keep this as a Day.js object
  const hours = [];

  for (let i = 0; i < 24; i++) {
    // Clone the startDate to avoid mutating the original
    const startTime = startDate.hour(i).minute(0).second(0); // Set the hour to i and minute/second to 0
    const endTime = startDate.hour(i).minute(59).second(59); // Set the end time to 59:59

    hours.push({
      date: startDate.format('YYYY-MM-DD'), // Format for output
      hour: startTime.format('HH:mm'),
      startUnix: startTime.unix(),
      endUnix: endTime.unix(),
    });
  }

  return hours;
};

export const checkEventInMonth = (events, monthIndex, year) => {
  return events.filter(event => {
    const eventStartDate = dayjs(event.start);
    return eventStartDate.month() === monthIndex && eventStartDate.year() === year;
  });
};

export const getStartOfWeek = (date = dayjs()) => {
    return date.startOf("week").add(1, "day");
  };


  export const getWeekRange=(dateInput) =>{
    const today = dayjs(dateInput);
  
    const startOfWeek = today.startOf('week').add(1, 'day'); 
  
    const endOfWeek = startOfWeek.add(6, 'days');
  
    const formattedStart = startOfWeek.format('Do  MMM  YYYY');
    const formattedEnd = endOfWeek.format('Do  MMM  YYYY');
  
    return `${formattedStart} to ${formattedEnd}`;
  }