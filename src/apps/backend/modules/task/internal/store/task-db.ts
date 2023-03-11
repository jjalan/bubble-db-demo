/* eslint-disable max-classes-per-file */
import { Model } from 'sequelize';
import { Revision, RevisionChange } from 'sequelize-revision';

type SequelizeRevisionOptions = {
  enableMigration: boolean,
  enableRevisionChangeModel: boolean,
  exclude: Array<string>;
};

export class TaskDb extends Model {
  declare id: number;
  declare revision: number;

  declare _id: string;
  declare 'Created By': string;
  declare 'Created Date': string;
  declare name: string;
}

export type TaskRevisionDb = Revision<SequelizeRevisionOptions>;

export type TaskRevisionChangeDb = RevisionChange<SequelizeRevisionOptions>;
