export function getAppointmentsForDay(state, day) {
    const filteredAppointments = [];
    state.days.forEach(element => {
      if (element.name === day) {
        element.appointments.forEach(id => {
          filteredAppointments.push(state.appointments[id]);
        });
      }
    });
    return filteredAppointments;
  }
  export function getInterview(state, interview) {

    if (!interview) {
  
      return null;
  
    } else {
  
      const interviewerInfo = state.interviewers[interview.interviewer]
  
      return {
  
        student: interview.student,
  
        interviewer: interviewerInfo
  
      };
  
    }
  
  } 