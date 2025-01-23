import React from 'react'
import { useWFCFormToolAgenda } from './useWFCFormToolAgenda';
import { mockAgenda } from "./AgendaMockup";
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import { es } from "date-fns/locale/es";
registerLocale("es", es);
import { useForm } from 'react-hook-form';
import { setHours, setMinutes, subDays, addDays, getDay } from "date-fns";

export const WFCFormToolAgenda = () => {

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const {
    reasonsList,
    startDate,
    setStartDate,
    timeIntervals,
    dateFormat,
    isWeekday,
    minTime,
    maxTime,
    excludeDates,
    maxDaysToSchedule,
    formatUTC,
    getTimeByDay,
    type,
  } = useWFCFormToolAgenda(mockAgenda.objConf);

  const handleChangeDate = (date) => {
    const myDate = formatUTC(date);
    console.log("date normal", date);
    console.log("date UTC", formatUTC(date));
    console.log("date toISO", myDate.toISOString());
    console.log("date toLocale", myDate.toLocaleString());
    setStartDate(date);
    setValue("agendaDate", formatUTC(date));
    // Calculate intervals of time from specific day
    const day = getDay(date);
    getTimeByDay(date, day);
  };

  return (
    <div className="mt-2 d-flex flex-column">
                  <label htmlFor="">Fecha y hora de llamada</label>
                  <DatePicker
                    className="form-control"
                    popperPlacement="bottom"
                    locale="es"
                    selected={startDate}
                    onChange={handleChangeDate}
                    onKeyDown={(e) => e.preventDefault()}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={timeIntervals}
                    timeCaption="Horario"
                    dateFormat={dateFormat}
                    filterDate={isWeekday}
                    minTime={minTime}
                    maxTime={maxTime}
                    excludeDateIntervals={excludeDates}
                    minDate={subDays(new Date(), 0)}
                    maxDate={addDays(new Date(), Number(maxDaysToSchedule))}
                  />
    </div>
  )
}
