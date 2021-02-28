"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene = void 0;
const common_1 = require("@nestjs/common");
const telegraf_constants_1 = require("../../telegraf.constants");
/**
 * TODO
 */
const Scene = (id) => common_1.SetMetadata(telegraf_constants_1.SCENE_METADATA, id);
exports.Scene = Scene;
