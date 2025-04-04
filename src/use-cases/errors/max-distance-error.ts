export class MaxDistanceError extends Error {
  constructor() {
    super('Max distance reached. Get closer to check-in');
  }
}
