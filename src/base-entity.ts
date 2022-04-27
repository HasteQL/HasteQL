import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


@ObjectType({ isAbstract: true })
export abstract class BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    @Field({ description: 'Unique identifier for the entity', nullable: false })
    id: string;

    @CreateDateColumn({
        type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP(6)', nullable: false
    })
    @Field({ description: 'Timestamp of when the entity was created', nullable: false })
    createdDate: Date;

    @UpdateDateColumn({
        type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP(6)', nullable: false
    })
    @Field({ description: 'Timestamp of when the entity was last updated', nullable: false })
    updatedDate: Date;

    @Column('boolean', { default: false, nullable: false })
    @Field({ description: 'Indicator for entity soft deletion', defaultValue: false, nullable: false })
    isDeleted: boolean;


}
