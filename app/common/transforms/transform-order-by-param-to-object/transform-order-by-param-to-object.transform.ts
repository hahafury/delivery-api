import { TransformFnParams } from 'class-transformer';
import { InternalServerErrorException } from '@nestjs/common';
import type { TransformedOrderByParam } from './transform-order-by-param-to-object.type';

export const transformOrderByParamToObject = <EntityKeys extends string>({
  value,
}: TransformFnParams): TransformedOrderByParam<EntityKeys> => {
  if (!Array.isArray(value)) {
    return value;
  }

  const entries: string[][] = value.map((item: string): string[] => {
    return item.split(',').map((splitItem: string) => splitItem.trim());
  });

  return Object.fromEntries(entries);
};
