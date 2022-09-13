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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResponse = exports.validateRequest = exports.RequestDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class RequestDto {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RequestDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RequestDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(10),
    (0, class_validator_1.MinLength)(3),
    __metadata("design:type", String)
], RequestDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], RequestDto.prototype, "completed", void 0);
exports.RequestDto = RequestDto;
const validateRequest = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('validating....');
    const newData = (0, class_transformer_1.plainToClass)(RequestDto, data);
    const errors = yield (0, class_validator_1.validate)(newData);
    const mapped = errors.map(e => {
        delete e.target;
        delete e.children;
        return e;
    });
    if (mapped.length > 0) {
        console.log('Request validation failed. errors: ');
        return { success: false, errors: mapped };
    }
    else {
        return { success: true };
    }
});
exports.validateRequest = validateRequest;
const validateResponse = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ data });
    console.log('validating....');
    const newData = (0, class_transformer_1.plainToClass)(RequestDto, data);
    const errors = yield (0, class_validator_1.validate)(newData);
    const mapped = errors.map(e => {
        delete e.target;
        delete e.children;
        return e;
    });
    if (mapped.length > 0) {
        console.log('Response validation failed. errors: ');
        return { success: false, errors: mapped };
    }
    else {
        return { success: true };
    }
});
exports.validateResponse = validateResponse;
