import { createListenerDecorator } from '../../utils';
import { Scenes } from 'telegraf';
import { ComposerMethodArgs } from '../../types';

type ResultType = (
  ...args: ComposerMethodArgs<Scenes.BaseScene<never>>
) => MethodDecorator;

export const SceneLeave: ResultType = createListenerDecorator<
  Scenes.BaseScene<never>
>('leave');
