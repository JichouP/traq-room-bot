import notFound from './notFound';
import { createRequestMock } from '@/utils/utils';

describe('notfound', () => {
  test('should get 404', () => {
    const { req, res, next } = createRequestMock();

    notFound(req, res, next);
    expect(res.sendStatus.calledWith(404)).toBeTruthy();
  });
});
