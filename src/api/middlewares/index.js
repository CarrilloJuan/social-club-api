export { default as errorHandler } from './errorHandler';
export { default as requestValidation } from './requestValidation';
export { default as cache } from './cache';

export const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
