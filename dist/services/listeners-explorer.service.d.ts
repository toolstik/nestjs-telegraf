import { OnModuleInit } from '@nestjs/common';
import { DiscoveryService, ModuleRef, ModulesContainer } from '@nestjs/core';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
import { ExternalContextCreator } from '@nestjs/core/helpers/external-context-creator';
import { MetadataAccessorService } from './metadata-accessor.service';
import { BaseExplorerService } from './base-explorer.service';
import { TelegrafModuleOptions } from '../interfaces';
export declare class ListenersExplorerService extends BaseExplorerService implements OnModuleInit {
    private readonly telegrafOptions;
    private readonly botName;
    private readonly moduleRef;
    private readonly discoveryService;
    private readonly metadataAccessor;
    private readonly metadataScanner;
    private readonly modulesContainer;
    private readonly externalContextCreator;
    private readonly telegrafParamsFactory;
    private readonly stage;
    private bot;
    constructor(telegrafOptions: TelegrafModuleOptions, botName: string, moduleRef: ModuleRef, discoveryService: DiscoveryService, metadataAccessor: MetadataAccessorService, metadataScanner: MetadataScanner, modulesContainer: ModulesContainer, externalContextCreator: ExternalContextCreator);
    onModuleInit(): void;
    explore(): void;
    private registerUpdates;
    private registerScenes;
    private filterUpdates;
    private filterScenes;
    private registerListeners;
    private registerIfListener;
    createContextCallback<T extends Record<string, unknown>>(instance: T, prototype: unknown, methodName: string): (...args: any[]) => Promise<any>;
}
