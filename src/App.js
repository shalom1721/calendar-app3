import React, { useState, useEffect } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  format,
  isSameDay,
  isSameMonth,
  parseISO
} from 'date-fns';
import './Calendar.css';
import eventsData from './events.json';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(eventsData);
  }, []);

  const generateCalendar = () => {
    const startMonth = startOfMonth(currentDate);
    const endMonth = endOfMonth(currentDate);
    const startDate = startOfWeek(startMonth, { weekStartsOn: 0 });
    const endDate = endOfWeek(endMonth, { weekStartsOn: 0 });

    const days = [];
    let day = startDate;

    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }

    return days;
  };

  const calendarDays = generateCalendar();

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <h2>{format(currentDate, 'MMMM yyyy')}</h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>

      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} className="calendar-cell calendar-day-label">
            {d}
          </div>
        ))}

        {calendarDays.map((day, index) => {
          const dayEvents = events.filter((event) =>
            isSameDay(parseISO(event.date), day)
          );

          const isToday = isSameDay(day, new Date());

          return (
            <div
              key={index}
              className={`calendar-cell ${
                !isSameMonth(day, currentDate) ? 'faded' : ''
              } ${isToday ? 'today' : ''}`}
            >
              <div className="date-number">{format(day, 'd')}</div>
              {dayEvents.map((event, i) => (
                <div key={i} className="event">
                  {event.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;