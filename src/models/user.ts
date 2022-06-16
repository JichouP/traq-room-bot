import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { CreateDoc, FilterQuery } from 'mongoose';
// import * as mongoose from 'mongoose';

export interface UserSchema extends Base {}
@modelOptions({
  schemaOptions: {
    id: false,
    collection: 'users',
  },
})
export class UserSchema extends TimeStamps {
  @prop({ required: true, unique: true })
  public trapId!: string;

  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public token!: string;
}

export const userModel = getModelForClass(UserSchema);

export class User {
  public async findList(
    q: FilterQuery<UserSchema> = {}
  ): Promise<UserSchema[]> {
    return userModel.find(q).exec();
  }
  public async findOne(
    q: FilterQuery<UserSchema> = {}
  ): Promise<UserSchema | null> {
    return userModel.findOne(q).exec();
  }
  public async create(user: CreateDoc<UserSchema>): Promise<UserSchema> {
    return userModel.create(user);
  }
  public async deleteByTrapId(trapId: string) {
    return userModel.deleteMany({ trapId });
  }
}

export const user = new User();
export default user;
