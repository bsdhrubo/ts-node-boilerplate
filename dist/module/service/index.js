"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.insertOne = exports.getAll = exports.insertMany = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const validator_dto_1 = require("../controller/dto/validator.dto");
const model_1 = __importDefault(require("../model"));
const insertMany = () => __awaiter(void 0, void 0, void 0, function* () {
    const apiURL = 'https://jsonplaceholder.typicode.com/todos';
    const data = yield (yield (0, node_fetch_1.default)(apiURL)).json();
    yield model_1.default.collection.drop();
    yield model_1.default.insertMany(data);
    return "ok";
});
exports.insertMany = insertMany;
const getAll = (skip = 0) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield model_1.default.find().skip(skip).limit(20);
    return res;
});
exports.getAll = getAll;
const insertOne = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield model_1.default.create(data);
        res.title = 'sdfjsjdbfg sdfgbjsd sdfgnjdsf';
        const { success, errors } = yield (0, validator_dto_1.validateResponse)(res);
        if (success) {
            return res;
        }
        else {
            return errors;
        }
    }
    catch (error) {
        return error;
    }
});
exports.insertOne = insertOne;
const deleteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield model_1.default.findOneAndDelete(id);
    return res;
});
exports.deleteById = deleteById;
