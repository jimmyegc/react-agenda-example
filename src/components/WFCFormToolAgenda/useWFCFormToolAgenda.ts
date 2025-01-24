import { useEffect, useState } from "react";
import { setHours, setMinutes, subDays, addDays, getDay } from "date-fns";

export const useWFCFormToolAgenda = (objConf) => {      
  // console.log(objConf)
  const [configuration, setConfiguration] = useState(objConf);  
  const {
    formatHour,
    maxDaysToSchedule,
    reasons,
    timeIntervals: inputTimeIntervals,
    dateIntervals,    
    type,
  } = configuration

  const [startDate, setStartDate] = useState(new Date());
  const [minTime, setMinTime] = useState(setHours(setMinutes(new Date(), 0), 0));
  const [maxTime, setMaxTime] = useState(setHours(setMinutes(new Date(), 59), 23));  
  const [excludeDates, setExcludeDates] = useState([]);
  const timeIntervals = Number(inputTimeIntervals);
  const dateFormat =
    formatHour === "12" ? "MMMM d, yyyy h:mm aa" : "MMMM d, yyyy HH:mm";

  const isWeekday = (date) => {
    const day = getDay(date); // Obtén el día de la semana de la fecha actual (0 para domingo, 6 para sábado)
    // Extrae los días de la semana desde los intervalos de fechas
    const daysOfWeek = dateIntervals.map((date) =>
      date.day === 7 ? 0 : date.day
    );
    // Define todos los días de la semana
    const allDays = [0, 1, 2, 3, 4, 5, 6];
    // Encuentra los días que faltan en el arreglo 'daysOfWeek'
    const missingDays = allDays.filter((day) => !daysOfWeek.includes(day));
    // Devuelve 'true' si el día actual no está en 'missingDays' (es decir, si está permitido)
    return !missingDays.includes(day);
  };

  const getTimeByDay = (date, day) => {
    // Convierte el día 7 (domingo) a 0, y mantiene los otros días tal cual
    const formattedIntervals = dateIntervals.map((item) => ({
      day: item.day === 7 ? 0 : item.day,
      initialHour: item.initialHour,
      finalHour: item.finalHour,
    }));
    // Encuentra el intervalo de tiempo correspondiente al día especificado
    const timeForDay = formattedIntervals.find((item) => item.day === day);
    console.log(date);
    console.log(timeForDay)
    if (timeForDay) {
      const { initialHour, finalHour } = timeForDay;
      console.log(new Date())
      // Configura el tiempo mínimo usando la hora inicial
      setMinTime(
        setHours(
          setMinutes(new Date(), Number(initialHour.split(":")[1])),
          Number(initialHour.split(":")[0])
        )
      );
      // Configura el tiempo máximo usando la hora final
      setMaxTime(
        setHours(
          setMinutes(new Date(), Number(finalHour.split(":")[1])),
          Number(finalHour.split(":")[0])
        )
      );
    }
  };

  const calculateBlockDays = () => {
    //if (objConf.canBlockDays === undefined) return;
    if (objConf.canBlockDays) {
      const blockDates = [];
      if (objConf.disabledDays.length > 0) {
        objConf.disabledDays.forEach((day) => {
          blockDates.push({
            start: new Date(day.rawDate.split("@")[0]),
            end: new Date(day.rawDate.split("@")[1]),
          });
        });
        setExcludeDates(blockDates);
      }
    }
  };

  const formatUTC = (dateInt, addOffset = false) => {
    const date =
      !dateInt || dateInt.length < 1 ? new Date() : new Date(dateInt);
    if (typeof dateInt === "string") {
      return date;
    } else {
      const offset = addOffset
        ? date.getTimezoneOffset()
        : -date.getTimezoneOffset();
      const offsetDate = new Date();
      offsetDate.setTime(date.getTime() + offset * 60000);
      return offsetDate;
    }
  };

  const parseRejectionReasons = (input) => {
    return input.split("\n").map((line) => {
      const [id, reason] = line.split(",");
      return { id: parseInt(id.trim()), reason: reason.trim() };
    });
  };

  const reasonsList = parseRejectionReasons(reasons);
  
  useEffect(() => {
    if (objConf) setConfiguration(objConf);
  }, [objConf]);

  useEffect(() => {
    calculateBlockDays();    
  }, []);

  return {
    type,
    startDate,
    setStartDate,
    minTime,
    maxTime,
    excludeDates, 
    timeIntervals,
    maxDaysToSchedule,
    dateFormat,
    reasonsList,            
    isWeekday,
    getTimeByDay,
    calculateBlockDays,
    formatUTC,
  }
}