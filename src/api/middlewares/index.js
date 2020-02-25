export { default as errorHandler } from './errorHandler';
export { default as requestValidation } from './requestValidation';

export const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
