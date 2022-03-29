import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbMysqlDataSource} from '../datasources';
import {Schedule, ScheduleRelations, Lesson} from '../models';
import {LessonRepository} from './lesson.repository';

export class ScheduleRepository extends DefaultCrudRepository<
  Schedule,
  typeof Schedule.prototype.id,
  ScheduleRelations
> {

  public readonly lessons: HasManyRepositoryFactory<Lesson, typeof Schedule.prototype.id>;

  constructor(
    @inject('datasources.db_mysql') dataSource: DbMysqlDataSource, @repository.getter('LessonRepository') protected lessonRepositoryGetter: Getter<LessonRepository>,
  ) {
    super(Schedule, dataSource);
    this.lessons = this.createHasManyRepositoryFactoryFor('lessons', lessonRepositoryGetter,);
    this.registerInclusionResolver('lessons', this.lessons.inclusionResolver);
  }
}
