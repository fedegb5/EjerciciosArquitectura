"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Pipeline_1 = __importDefault(require("./Pipeline"));
const filters_1 = require("./filters");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 3000;
app.get("/api/posts", function (req, res) {
    var _a;
    const data = ((_a = req.query.data) === null || _a === void 0 ? void 0 : _a.toString()) || "";
    var pipeline = new Pipeline_1.default();
    pipeline.use(filters_1.badWords);
    const result = pipeline.run(data);
    res.send(result);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
