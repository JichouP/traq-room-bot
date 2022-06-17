import mongoose, { CreateDoc } from 'mongoose';
import { userModel, UserSchema, user } from './user';
import { connectMock, disconnectMock } from '@/utils/utils';

const initUsers = [
  { trapId: 'user1', token: '1', name: 'user1' },
  { trapId: 'user2', token: '2', name: 'user2' },
  { trapId: 'user3', token: '3', name: 'user3' },
];
let users: UserSchema[] = [];

describe('model/user', () => {
  beforeAll(connectMock(mongoose, 'jest-models'));
  beforeEach(async () => {
    await userModel.deleteMany({});
    users = await userModel.insertMany(initUsers);
  });
  afterAll(disconnectMock(mongoose));

  describe('findList', () => {
    test('should get user list', async () => {
      const docs = await user.findList();
      expect(docs.length).toBe(3);
    });
  });
  describe('find', () => {
    test('should get user', async () => {
      const doc = await user.findOne({ _id: users[0]._id });
      if (!doc) {
        return;
      }
      expect(doc.trapId).toEqual(users[0].trapId);
      expect(doc.createdAt instanceof Date).toBeTruthy();
      expect(mongoose.isValidObjectId(doc._id)).toBeTruthy();
    });
    test('should fail to get user', async () => {
      await expect(user.findOne({ _id: '' })).rejects.toThrow();
    });
  });
  describe('create', () => {
    test('should create user', async () => {
      const doc = await user.create({
        trapId: 'user4',
        name: 'user4',
        token: '4',
      });
      expect(doc.trapId).toBe('user4');
    });
    describe('validation', () => {
      test('should fail to create duplicate user', async () => {
        await expect(
          user.create({ trapId: 'user1', name: 'user1', token: '1' })
        ).rejects.toThrow();
      });
      test('should fail to create blank user', async () => {
        await expect(
          user.create({} as CreateDoc<UserSchema>)
        ).rejects.toThrow();
      });
    });
  });
});
