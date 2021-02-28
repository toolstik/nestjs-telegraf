import { Reflector } from '@nestjs/core';
import { ListenerMetadata } from '../interfaces';
export declare class MetadataAccessorService {
    private readonly reflector;
    constructor(reflector: Reflector);
    isUpdate(target: Function): boolean;
    isScene(target: Function): boolean;
    getListenerMetadata(target: Function): ListenerMetadata | undefined;
    getSceneMetadata(target: Function): string | undefined;
}
