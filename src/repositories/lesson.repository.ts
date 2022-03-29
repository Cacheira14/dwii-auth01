import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbMysqlDataSource} from '../datasources';
import {Lesson, LessonRelations, Schedule} from '../models';
import {ScheduleRepository} from './schedule.repository';

export class LessonRepository extends DefaultCrudRepository<
  Lesson,
  typeof Lesson.prototype.id,
  LessonRelations
> {

  public readonly schedule: BelongsToAccessor<Schedule, typeof Lesson.prototype.id>;

  constructor(
    @inject('datasources.db_mysql') dataSource: DbMysqlDataSource, @repository.getter('ScheduleRepository') protected scheduleRepositoryGetter: Getter<ScheduleRepository>,
  ) {
    super(Lesson, dataSource);
    this.schedule = this.createBelongsToAccessorFor('schedule', scheduleRepositoryGetter,);
    this.registerInclusionResolver('schedule', this.schedule.inclusionResolver);
  }
}
