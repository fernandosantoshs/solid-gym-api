export class ExpiredCheckInValidationError extends Error {
  constructor() {
    super('The time to validate check-in has expired.');
  }
}
