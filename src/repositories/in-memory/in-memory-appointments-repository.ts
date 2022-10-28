import { areIntervalsOverlapping } from 'date-fns'

import { Appointment } from "../../entities/appointment";
import { AppointmentsRepository } from "../appointments-repository";

export class InMemoryAppointmentsRepository implements AppointmentsRepository {
  public appointments: Appointment[] = [];

  async create(appointment: Appointment): Promise<void> {
    this.appointments.push(appointment);
  }

  async findOverLapingAppointment(startsAt: Date, endsAt: Date): Promise<Appointment | null> {
    const overLappingAppointment = this.appointments.find(appointment => {
      return areIntervalsOverlapping(
        { start: appointment.startsAt, end: appointment.endsAt },
        { start: startsAt, end: endsAt },
        { inclusive: true }
      )
    })

    if (!overLappingAppointment) {
      return null;
    }

    return overLappingAppointment;
  }
}