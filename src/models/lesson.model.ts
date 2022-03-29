import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Schedule} from './schedule.model';

@model()
export class Lesson extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  subject?: string;

  @property({
    type: 'string',
  })
  course?: string;

  @property({
    type: 'number',
  })
  year?: number;

  @property({
    type: 'string',
  })
  group?: string;

  @property({
    type: 'string',
  })
  room?: string;

  @property({
    type: 'string',
    required: true,
  })
  date: string;

  @property({
    type: 'string',
    required: true,
  })
  time: string;

  @property({
    type: 'number',
    required: true,
  })
  duration: number;

  @belongsTo(() => Schedule)
  scheduleId: number;

  constructor(data?: Partial<Lesson>) {
    super(data);
  }
}

export interface LessonRelations {
  // describe navigational properties here
}

export type LessonWithRelations = Lesson & LessonRelations;
