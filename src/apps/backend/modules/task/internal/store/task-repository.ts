import { DataTypes, ModelStatic, Sequelize } from 'sequelize';
import { SequelizeRevision } from 'sequelize-revision';

import { TaskDb, TaskRevisionDb, TaskRevisionChangeDb } from './task-db';

export default class TaskRepository {
  public static taskDB: typeof TaskDb;
  public static revisionDB: ModelStatic<TaskRevisionDb>;
  public static revisionChangeDB: ModelStatic<TaskRevisionChangeDb>;

  static async createDBConnection(): Promise<void> {
    const sequelize = new Sequelize('bubble-db-demo-dev', 'root', '', { host: 'localhost', dialect: 'mysql' });

    TaskDb.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        _id: {
          type: DataTypes.STRING(128),
          unique: true,
        },
        name: {
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
        'Created By': {
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
        'Created Date': {
          type: new DataTypes.STRING(128),
          allowNull: false,
        },
        revision: {
          type: DataTypes.INTEGER,
        },
      },
      {
        tableName: 'Tasks',
        sequelize,
        timestamps: false,
      },
    );

    await TaskDb.sync();

    const sequelizeRevision = new SequelizeRevision(sequelize, {
      enableMigration: true,
      enableRevisionChangeModel: true,
      exclude: ['_id'],
    });
    const [Revision, RevisionChange] = sequelizeRevision.defineModels();
    await Revision.sync();
    await RevisionChange.sync();

    await sequelizeRevision.trackRevision(TaskDb);

    TaskRepository.taskDB = TaskDb;
    TaskRepository.revisionDB = Revision;
    TaskRepository.revisionChangeDB = RevisionChange;
  }
}
