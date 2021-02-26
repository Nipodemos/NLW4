import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';
import Survey from './survey';
import User from './user';

@Entity('surveys_users')
export default class SurveyUser {
  @PrimaryColumn()
  readonly id: string;

  @Column({ name: 'survey_id' })
  surveyId: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Survey)
  @JoinColumn({ name: 'survey_id' })
  survey: Survey;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column()
  value: number;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
