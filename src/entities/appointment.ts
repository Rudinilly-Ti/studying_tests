export interface AppointmentProps {
  costumer: string;
  startsAt: Date;
  endsAt: Date;
}

export class Appointment {
  private props: AppointmentProps;

  get costumer() {
    return this.props.costumer;
  }

  get startsAt() {
    return this.props.startsAt;
  }

  get endsAt() {
    return this.props.endsAt;
  }

  constructor(props: AppointmentProps) {
    const { startsAt, endsAt } = props;

    if (startsAt <= new Date()) {
      throw new Error('Start date cannot be before now');
    }

    if (endsAt <= startsAt) {
      throw new Error('Invalid end date');
    }

    this.props = props;
  }
}