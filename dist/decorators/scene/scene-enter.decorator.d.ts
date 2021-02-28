import { Scenes } from 'telegraf';
import { ComposerMethodArgs } from '../../types';
declare type ResultType = (...args: ComposerMethodArgs<Scenes.BaseScene<never>>) => MethodDecorator;
export declare const SceneEnter: ResultType;
export {};
