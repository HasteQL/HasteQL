import { Field } from '@nestjs/graphql';
import { SelectQueryBuilder, WhereExpressionBuilder } from 'typeorm';
import { BaseEntity } from './base-entity';


export interface IQueryOperators<T> {
    _eq?: T;
    _neq?: T;
    _in?: T[];
    _nin?: T[];
    _lt?: T;
    _lte?: T;
    _gt?: T;
    _gte?: T;
    _contains?: T;
    _not_contains?: T;
    _starts_with?: T;
    _not_starts_with?: T;
    _ends_with?: T;
    _not_ends_with?: T;
}


export class QueryString implements IQueryOperators<string> {
    @Field(() => String, { nullable: true })
    _eq?: string;
        
    @Field(() => String, { nullable: true })
    _neq?: string;
        
    @Field(() => [String], { nullable: true })
    _in?: string[];
        
    @Field(() => [String], { nullable: true })
    _nin?: string[];
        
    @Field(() => String, { nullable: true })
    _contains?: string;
        
    @Field(() => String, { nullable: true })
    _not_contains?: string;
        
    @Field(() => String, { nullable: true })
    _starts_with?: string;
        
    @Field(() => String, { nullable: true })
    _not_starts_with?: string;
        
    @Field(() => String, { nullable: true })
    _ends_with?: string;
        
    @Field(() => String, { nullable: true })
    _not_ends_with?: string;
}


export class QueryNumber implements IQueryOperators<number> {
    @Field(() => Number, { nullable: true })
    _eq?: number;
        
    @Field(() => Number, { nullable: true })
    _neq?: number;
        
    @Field(() => [Number], { nullable: true })
    _in?: number[];
        
    @Field(() => [Number], { nullable: true })
    _nin?: number[];
        
    @Field(() => Number, { nullable: true })
    _lt?: number;
        
    @Field(() => Number, { nullable: true })
    _lte?: number;
        
    @Field(() => Number, { nullable: true })
    _gt?: number;
        
    @Field(() => Number, { nullable: true })
    _gte?: number;
}


export class QueryBoolean implements IQueryOperators<boolean> {
    @Field(() => Boolean, { nullable: true })
    _eq?: boolean;
        
    @Field(() => Boolean, { nullable: true })
    _neq?: boolean;
}


export class QueryUuid implements IQueryOperators<string> {
    @Field(() => String, { nullable: true })
    _eq?: string;
        
    @Field(() => String, { nullable: true })
    _neq?: string;
        
    @Field(() => [String], { nullable: true })
    _in?: string[];
        
    @Field(() => [String], { nullable: true })
    _nin?: string[];
}


const IN = (value: any | any[]): string => {
    if(Array.isArray(value)) {
        return `[${value.map((v) => typeof v !== 'string' ? v : `"${v}"`).join(',')}]`;
    } else {
        return `[${value}]`;
    }
};


const QueryFunctions: { [key: string]: [string, (value) => string ] } = {
    _eq: [ '=', (value) => value ],
    _neq: [ '!=', (value) => value ],
    _in: [ 'IN', (value) => IN(value) ],
    _nin: [ 'NOT IN', (value) => IN(value) ],
    _lt: [ '<', (value) => value ],
    _lte: [ '<=', (value) => value ],
    _gt: [ '>', (value) => value ],
    _gte: [ '>=', (value) => value ],
    _contains: [ 'ILIKE', (value) => `%${value}%` ],
    _not_contains: [ 'NOT ILIKE', (value) => `%${value}%` ],
    _starts_with: [ 'ILIKE', (value) => `${value}%` ],
    _not_starts_with: [ 'NOT ILIKE', (value) => `${value}%` ],
    _ends_with: [ 'ILIKE', (value) => `%${value}` ],
    _not_ends_with: [ 'NOT ILIKE', (value) => `%${value}` ]
};


export type IQueryableField<E extends BaseEntity> = {
    [K in keyof E]?: IWhere<E> & IQueryOperators<any>;
}


export interface IWhere<E extends BaseEntity> {
    _and?: (IWhere<E> & IQueryableField<E>)[];
    _or?: (IWhere<E> & IQueryableField<E>)[];
}


const buildWhereClause = <E extends BaseEntity>(
    query: WhereExpressionBuilder, 
    where: IWhere<E>, 
    andOr: 'and' | 'or'
): WhereExpressionBuilder => {
    return null;
};


export function whereQuery<E extends BaseEntity>(
    query: SelectQueryBuilder<E>,
    where: IWhere<E>
): SelectQueryBuilder<E>;
export function whereQuery<E extends BaseEntity>(
    query: SelectQueryBuilder<E>, 
    where: IWhere<E>, 
    alias?: string
): SelectQueryBuilder<E> {
    return null;
};
