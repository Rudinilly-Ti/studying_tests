import { describe, expect, it } from 'vitest';
import { Appointment } from '../entities/appointment';
import { InMemoryAppointmentsRepository } from '../repositories/in-memory/in-memory-appointments-repository';
import { getFutureDate } from '../tests/utils/get-future-date';
import { CreateAppointment } from './create-appointment';

describe('create appointment', () => {
  it('should create an appointment', () => {
    const appointmentsRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmentsRepository);

    const startsAt = getFutureDate('2022-10-28');
    const endsAt = getFutureDate('2022-10-29');

    expect(createAppointment.execute({
      costumer: 'John Doe',
      startsAt,
      endsAt,
    })).resolves.toBeInstanceOf(Appointment)
  })

  it('should not create an appointment with overlapping dates', async () => {
    const appointmentsRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmentsRepository);

    const startsAt = getFutureDate('2022-10-28');
    const endsAt = getFutureDate('2022-11-05');

    await createAppointment.execute({
      costumer: 'John Doe',
      startsAt,
      endsAt,
    })

    expect(createAppointment.execute({
      costumer: 'John Doe',
      startsAt: getFutureDate('2022-10-30'), // overlapping date
      endsAt: getFutureDate('2022-11-05'), // overlapping date
    })).rejects.toBeInstanceOf(Error) // should throw an error
  })
})