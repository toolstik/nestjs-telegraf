"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createListenerDecorator = void 0;
const common_1 = require("@nestjs/common");
const telegraf_constants_1 = require("../telegraf.constants");
function createListenerDecorator(method) {
    return (...args) => {
        return common_1.SetMetadata(telegraf_constants_1.LISTENER_METADATA, {
            method,
            args,
        });
    };
}
exports.createListenerDecorator = createListenerDecorator;
