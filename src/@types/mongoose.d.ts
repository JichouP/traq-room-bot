declare module 'mongoose' {
  type Projection<Doc> = { _id?: 1 | 0 } & Partial<Record<keyof Doc, 0 | 1>>;
  type CreateDoc<Doc> = Omit<
    Doc,
    'createdAt' | 'updatedAt' | '_id' | '__t' | '__v' | 'id'
  > & {
    _id?: Types._ObjectId;
  };
}
