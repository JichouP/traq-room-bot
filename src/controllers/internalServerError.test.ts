import internalServerError from './internalServerError';
import { createRequestMock } from '@/utils/utils';

describe('internal server error', () => {
  test('should get 500', () => {
    const { req, res, next } = createRequestMock();
    internalServerError(new Error('error'), req, res, next);
    expect(res.status.calledWith(500)).toBeTruthy();
    expect(res.send.calledWith('Internal Server Error')).toBeTruthy();
  });
});
