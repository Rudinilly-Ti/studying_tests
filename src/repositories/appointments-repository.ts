import { Appointment } from "../entities/appointment";

export interface AppointmentsRepository {
  create(appointment: Appointment): Promise<void>;
  //save(appointment: Appointment): Promise<void>;
  findOverLapingAppointment(startsAt: Date, endsAt: Date): Promise<Appointment | null>;
}