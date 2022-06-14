import request from 'supertest';
import main from '@/main';

describe('integration test', () => {
  test('should 200', async () => {
    await request(main).get('/ping').expect(200, 'pong');
  });
});
