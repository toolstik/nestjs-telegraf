import { Scenes } from 'telegraf';
import { ComposerMethodArgs } from '../../types';
import { createListenerDecorator } from '../../utils';

type ResultType = (
  ...args: ComposerMethodArgs<Scenes.BaseScene<never>>
) => MethodDecorator;

export const SceneEnter: ResultType = createListenerDecorator<
  Scenes.BaseScene<never>
>('enter');
