import { BaseEntity } from './base-entity';
import { IWhere } from './where';


export interface IQueryable<E extends BaseEntity> {
    where?: IWhere<E>;
    // @TODO orderBy
}
