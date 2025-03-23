export abstract class BaseRepository<T> {
  abstract create(data: Partial<T>): Promise<T>;
  abstract getAll(): Promise<T[]>;
  abstract findById(id: number): Promise<T | undefined>;
  abstract update(id: number, data: Partial<T>): Promise<T>;
  abstract remove(id: number): Promise<void>;
}
