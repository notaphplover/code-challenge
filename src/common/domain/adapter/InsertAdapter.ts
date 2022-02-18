export interface InsertAdapter<TModel, TQuery> {
  insertOne(query: TQuery): Promise<TModel>;
}
