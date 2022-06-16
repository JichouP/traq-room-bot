import getPing from './ping';
import { createRequestMock } from '@/utils/utils';

describe('controller/ping', () => {
  test('should get 200', () => {
    const { req, res, next } = createRequestMock();
    getPing(req, res, next);
    expect(res.status.calledWith(200)).toBeTruthy();
    expect(res.send.calledWith('pong')).toBeTruthy();
  });
});
