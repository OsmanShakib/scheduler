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