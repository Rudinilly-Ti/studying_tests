import { test, expect } from 'vitest'
import { getFutureDate } from '../tests/utils/get-future-date'
import { Appointment } from './appointment'

test('create an appointment', () => {
  const startsAt = getFutureDate('2022-10-28')
  const endsAt = getFutureDate('2022-10-29')


  const appointment = new Appointment({
    costumer: 'John Doe',
    startsAt,
    endsAt,
  })

  expect(appointment).toBeInstanceOf(Appointment)
  expect(appointment.costumer).toEqual('John Doe')
})

test('cannot create an appointment with end date before start date', () => {
  const startsAt = getFutureDate('2022-10-28') // 2022-10-28
  const endsAt = getFutureDate('2022-10-27') // 2022-10-27

  expect(
    () => new Appointment({
      costumer: 'John Doe', startsAt, endsAt
    })
  ).toThrow()
})

test('cannot create an appointment with start date before now', () => {
  const startsAt = new Date(new Date().getTime() - 1)
  const endsAt = new Date(startsAt.getTime() + 1)

  expect(
    () => new Appointment({
      costumer: 'John Doe',
      startsAt,
      endsAt
    })
  ).toThrow()
})