"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListenersExplorerService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const metadata_scanner_1 = require("@nestjs/core/metadata-scanner");
const external_context_creator_1 = require("@nestjs/core/helpers/external-context-creator");
const telegraf_1 = require("telegraf");
const metadata_accessor_service_1 = require("./metadata-accessor.service");
const telegraf_constants_1 = require("../telegraf.constants");
const base_explorer_service_1 = require("./base-explorer.service");
const telegraf_params_factory_1 = require("../factories/telegraf-params-factory");
let ListenersExplorerService = class ListenersExplorerService extends base_explorer_service_1.BaseExplorerService {
    constructor(telegrafOptions, botName, moduleRef, discoveryService, metadataAccessor, metadataScanner, modulesContainer, externalContextCreator) {
        super();
        this.telegrafOptions = telegrafOptions;
        this.botName = botName;
        this.moduleRef = moduleRef;
        this.discoveryService = discoveryService;
        this.metadataAccessor = metadataAccessor;
        this.metadataScanner = metadataScanner;
        this.modulesContainer = modulesContainer;
        this.externalContextCreator = externalContextCreator;
        this.telegrafParamsFactory = new telegraf_params_factory_1.TelegrafParamsFactory();
        this.stage = new telegraf_1.Scenes.Stage();
    }
    onModuleInit() {
        this.bot = this.moduleRef.get(this.botName, {
            strict: false,
        });
        this.bot.use(this.stage.middleware());
        this.explore();
    }
    explore() {
        const modules = this.getModules(this.modulesContainer, this.telegrafOptions.include || []);
        this.registerUpdates(modules);
        this.registerScenes(modules);
    }
    registerUpdates(modules) {
        const updates = this.flatMap(modules, (instance) => this.filterUpdates(instance));
        updates.forEach((wrapper) => this.registerListeners(this.bot, wrapper));
    }
    registerScenes(modules) {
        const scenes = this.flatMap(modules, (wrapper) => this.filterScenes(wrapper));
        scenes.forEach((wrapper) => {
            const sceneId = this.metadataAccessor.getSceneMetadata(wrapper.instance.constructor);
            const scene = new telegraf_1.Scenes.BaseScene(sceneId);
            this.stage.register(scene);
            this.registerListeners(scene, wrapper);
        });
    }
    filterUpdates(wrapper) {
        const { instance } = wrapper;
        if (!instance)
            return undefined;
        const isUpdate = this.metadataAccessor.isUpdate(wrapper.metatype);
        if (!isUpdate)
            return undefined;
        return wrapper;
    }
    filterScenes(wrapper) {
        const { instance } = wrapper;
        if (!instance)
            return undefined;
        const isScene = this.metadataAccessor.isScene(wrapper.metatype);
        if (!isScene)
            return undefined;
        return wrapper;
    }
    registerListeners(composer, wrapper) {
        const { instance } = wrapper;
        const prototype = Object.getPrototypeOf(instance);
        this.metadataScanner.scanFromPrototype(instance, prototype, (name) => this.registerIfListener(composer, instance, prototype, name));
    }
    registerIfListener(composer, instance, prototype, methodName) {
        const methodRef = prototype[methodName];
        const metadata = this.metadataAccessor.getListenerMetadata(methodRef);
        if (!metadata) {
            return undefined;
        }
        const listenerCallbackFn = this.createContextCallback(instance, prototype, methodName);
        const { method, args } = metadata;
        /* Basic callback */
        // composer[method](...args, listenerCallbackFn);
        /* Complex callback return value handing */
        composer[method](...args, async (ctx, next) => {
            const result = await listenerCallbackFn(ctx, next);
            if (result) {
                await ctx.reply(String(result));
            }
            // TODO-Possible-Feature: Add more supported return types
        });
    }
    createContextCallback(instance, prototype, methodName) {
        const paramsFactory = this.telegrafParamsFactory;
        const resolverCallback = this.externalContextCreator.create(instance, prototype[methodName], methodName, telegraf_constants_1.PARAM_ARGS_METADATA, paramsFactory, undefined, undefined, undefined, 'telegraf');
        return resolverCallback;
    }
};
ListenersExplorerService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(telegraf_constants_1.TELEGRAF_MODULE_OPTIONS)),
    __param(1, common_1.Inject(telegraf_constants_1.TELEGRAF_BOT_NAME)),
    __metadata("design:paramtypes", [Object, String, core_1.ModuleRef,
        core_1.DiscoveryService,
        metadata_accessor_service_1.MetadataAccessorService,
        metadata_scanner_1.MetadataScanner,
        core_1.ModulesContainer,
        external_context_creator_1.ExternalContextCreator])
], ListenersExplorerService);
exports.ListenersExplorerService = ListenersExplorerService;
