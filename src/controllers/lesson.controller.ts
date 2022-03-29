import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Lesson} from '../models';
import {LessonRepository} from '../repositories';

export class LessonController {
  constructor(
    @repository(LessonRepository)
    public lessonRepository : LessonRepository,
  ) {}

  @post('/lessons')
  @response(200, {
    description: 'Lesson model instance',
    content: {'application/json': {schema: getModelSchemaRef(Lesson)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lesson, {
            title: 'NewLesson',
            exclude: ['id'],
          }),
        },
      },
    })
    lesson: Omit<Lesson, 'id'>,
  ): Promise<Lesson> {
    return this.lessonRepository.create(lesson);
  }

  @get('/lessons/count')
  @response(200, {
    description: 'Lesson model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Lesson) where?: Where<Lesson>,
  ): Promise<Count> {
    return this.lessonRepository.count(where);
  }

  @get('/lessons')
  @response(200, {
    description: 'Array of Lesson model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Lesson, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Lesson) filter?: Filter<Lesson>,
  ): Promise<Lesson[]> {
    return this.lessonRepository.find(filter);
  }

  @patch('/lessons')
  @response(200, {
    description: 'Lesson PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lesson, {partial: true}),
        },
      },
    })
    lesson: Lesson,
    @param.where(Lesson) where?: Where<Lesson>,
  ): Promise<Count> {
    return this.lessonRepository.updateAll(lesson, where);
  }

  @get('/lessons/{id}')
  @response(200, {
    description: 'Lesson model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Lesson, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Lesson, {exclude: 'where'}) filter?: FilterExcludingWhere<Lesson>
  ): Promise<Lesson> {
    return this.lessonRepository.findById(id, filter);
  }

  @patch('/lessons/{id}')
  @response(204, {
    description: 'Lesson PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lesson, {partial: true}),
        },
      },
    })
    lesson: Lesson,
  ): Promise<void> {
    await this.lessonRepository.updateById(id, lesson);
  }

  @put('/lessons/{id}')
  @response(204, {
    description: 'Lesson PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() lesson: Lesson,
  ): Promise<void> {
    await this.lessonRepository.replaceById(id, lesson);
  }

  @del('/lessons/{id}')
  @response(204, {
    description: 'Lesson DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.lessonRepository.deleteById(id);
  }
}
