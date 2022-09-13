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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const service_1 = require("../service");
const validator_dto_1 = require("./dto/validator.dto");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.send("Server Working");
});
router.get('/data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, service_1.getAll)();
    res.send(response);
}));
router.get('/insert-many', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = (0, service_1.insertMany)();
    res.send(response);
}));
router.post('/insert-one', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //validate req
    console.log(req.body);
    const { success, errors } = yield (0, validator_dto_1.validateRequest)(req.body);
    if (success) {
        const response = yield (0, service_1.insertOne)(req.body);
        res.json(response);
    }
    else {
        res.json(errors);
    }
}));
router.delete('/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.id);
    const response = (0, service_1.deleteById)(req.params.id);
    res.send(response);
}));
exports.default = router;
