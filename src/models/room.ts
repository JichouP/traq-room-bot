import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { CreateDoc, FilterQuery } from 'mongoose';

export interface RoomSchema extends Base {}
@modelOptions({
  schemaOptions: {
    id: false,
    collection: 'rooms',
  },
})
export class RoomSchema extends TimeStamps {
  @prop({ required: true })
  public room!: 'clubroom' | 'progressRoom';

  @prop({ required: true })
  public trapId!: string;

  @prop({ required: true })
  public name!: string;
}

export const roomModel = getModelForClass(RoomSchema);

export class Room {
  public async findList(
    q: FilterQuery<RoomSchema> = {}
  ): Promise<RoomSchema[]> {
    return roomModel.find(q).exec();
  }
  public async findOne(q: FilterQuery<RoomSchema>): Promise<RoomSchema | null> {
    return roomModel.findOne(q).exec();
  }
  public async create(room: CreateDoc<RoomSchema>): Promise<RoomSchema> {
    return roomModel.create(room);
  }
  public async deleteOne(q: FilterQuery<RoomSchema>) {
    return roomModel.deleteOne(q);
  }
  public async deleteMany(q: FilterQuery<RoomSchema>) {
    return roomModel.deleteMany(q);
  }
}

export const room = new Room();
export default room;
