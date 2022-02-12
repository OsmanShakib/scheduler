import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "components/Appointment";
import { getAppointmentsForDay,getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

const getInterview = function(state, interview) {
  const output = {};
  
  if (!interview) {
    return null;
  }

  const interviewer = state.interviewers[interview.interviewer];
  output["student"] = interview.student;
  output["interviewer"] = interviewer;
  return output;
}


export default function Application(props) {
  // // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {}
  // });
  const {bookInterview, cancelInterview,setState,state } = useApplicationData();

  const setDay = day => setState({ ...state, day });
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('/api/days')),
      Promise.resolve(axios.get('/api/appointments')),
      Promise.resolve(axios.get('/api/interviewers'))
    ])
      .then((all) => {
        setState(prev => ({ ...prev, 
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }));
      })
  }, []);
  const appointmentList = dailyAppointments.map((appointment) => {  
     const interview =  getInterview (state,appointment.interview)  
    // const newInterview = { student: appointment.interview.student, interviewer: state.interviewers[interview.interviewer] }
console.log(interview)

    return (
      <Appointment key={appointment.id} id={appointment.id} time={appointment.time} interview={interview} 
      interviewers={getInterviewersForDay(state, state.day)} bookInterview={bookInterview} cancelInterview={cancelInterview}/>
    );
  })
  
  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          onChange={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
      {appointmentList}
        <Appointment key="last" time="5pm" />      </section>
    </main>
  );
}