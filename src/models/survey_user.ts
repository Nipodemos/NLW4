import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

@Entity('surveys_users')
export default class SurveyUser {
  @PrimaryColumn()
  readonly id: string;

  @Column({ name: 'survey_id' })
  surveyId: string;

  @Column({ name: 'user_id' })
  userId: string;

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
