"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectBot = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../../utils");
const InjectBot = (botName) => common_1.Inject(utils_1.getBotToken(botName));
exports.InjectBot = InjectBot;
