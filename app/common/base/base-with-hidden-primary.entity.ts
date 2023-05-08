import { Generated, PrimaryColumn } from 'typeorm';

export class BaseOneToOneEntity {
  @PrimaryColumn({ type: 'uuid', select: false })
  @Generated('uuid')
  public id: string;
}
