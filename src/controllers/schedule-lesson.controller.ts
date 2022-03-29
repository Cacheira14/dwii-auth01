import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Schedule,
  Lesson,
} from '../models';
import {ScheduleRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate('jwt') 
export class ScheduleLessonController {
  constructor(
    @repository(ScheduleRepository) protected scheduleRepository: ScheduleRepository,
  ) { }

  @get('/schedules/{id}/lessons', {
    responses: {
      '200': {
        description: 'Array of Schedule has many Lesson',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Lesson)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Lesson>,
  ): Promise<Lesson[]> {
    return this.scheduleRepository.lessons(id).find(filter);
  }

  @post('/schedules/{id}/lessons', {
    responses: {
      '200': {
        description: 'Schedule model instance',
        content: {'application/json': {schema: getModelSchemaRef(Lesson)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Schedule.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lesson, {
            title: 'NewLessonInSchedule',
            exclude: ['id'],
            optional: ['scheduleId']
          }),
        },
      },
    }) lesson: Omit<Lesson, 'id'>,
  ): Promise<Lesson> {
    return this.scheduleRepository.lessons(id).create(lesson);
  }

  @patch('/schedules/{id}/lessons', {
    responses: {
      '200': {
        description: 'Schedule.Lesson PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lesson, {partial: true}),
        },
      },
    })
    lesson: Partial<Lesson>,
    @param.query.object('where', getWhereSchemaFor(Lesson)) where?: Where<Lesson>,
  ): Promise<Count> {
    return this.scheduleRepository.lessons(id).patch(lesson, where);
  }

  @del('/schedules/{id}/lessons', {
    responses: {
      '200': {
        description: 'Schedule.Lesson DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Lesson)) where?: Where<Lesson>,
  ): Promise<Count> {
    return this.scheduleRepository.lessons(id).delete(where);
  }
}
