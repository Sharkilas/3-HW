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
const supertest_1 = __importDefault(require("supertest"));
const http_status_codes_1 = require("../src/http-status-codes/http-status-codes");
const src_1 = require("./../src");
describe('/blogs', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app).delete('/testing/all-data');
    }));
    it('should return 200 add empty array', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .get("/blogs")
            .expect(http_status_codes_1.httpStatusCodes.OK_200);
    }));
    it('should return 404 for not existing blogs', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .get("/blogs/1")
            .expect(http_status_codes_1.httpStatusCodes.BAD_REQUEST_400);
    }));
    it("should'nt create blogs with incorrect input data", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .post('/blogs')
            .send({ name: '' })
            .expect(http_status_codes_1.httpStatusCodes.BAD_REQUEST_400);
        yield (0, supertest_1.default)(src_1.app)
            .get("/blogs")
            .expect(http_status_codes_1.httpStatusCodes.OK_200);
    }));
    let createdBlog = null;
    it("should create blogs with correct input data", () => __awaiter(void 0, void 0, void 0, function* () {
        const createResponse = yield (0, supertest_1.default)(src_1.app)
            .post('/blogs')
            .send({ name: 'VASILICH' })
            .expect(http_status_codes_1.httpStatusCodes.CREATED_201);
        const createdBlog = createResponse.body;
        expect(createdBlog).toEqual({
            id: expect.any(Number),
            name: 'VASILICH'
        });
        yield (0, supertest_1.default)(src_1.app)
            .get("/blogs")
            .expect(http_status_codes_1.httpStatusCodes.OK_200, [createdBlog]);
    }));
    it("should'nt update blogs with incorrect input data", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .put('/blogs/' + createdBlog.id)
            .send({ name: '' })
            .expect(http_status_codes_1.httpStatusCodes.BAD_REQUEST_400);
        yield (0, supertest_1.default)(src_1.app)
            .get("/blogs/" + createdBlog.id)
            .expect(http_status_codes_1.httpStatusCodes.OK_200, createdBlog);
    }));
    it("should'nt update blogs that not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .put('/blogs/' + "-22")
            .send({ name: 'good title' })
            .expect(http_status_codes_1.httpStatusCodes.NOT_FOUND_404);
    }));
    it("should update blogs with correct input data", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .put('/blogs/' + createdBlog.id)
            .send({ name: 'good new title' })
            .expect(http_status_codes_1.httpStatusCodes.NO_CONTEND_204);
        yield (0, supertest_1.default)(src_1.app)
            .get("/blogs/" + createdBlog.id)
            .expect(http_status_codes_1.httpStatusCodes.OK_200, Object.assign(Object.assign({}, createdBlog), { title: 'good new title' }));
    }));
    it("should delete blogs", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(src_1.app)
            .delete('/blogs/' + createdBlog.id)
            .expect(http_status_codes_1.httpStatusCodes.NO_CONTEND_204);
        yield (0, supertest_1.default)(src_1.app)
            .get("/blogs/" + createdBlog.id)
            .expect(http_status_codes_1.httpStatusCodes.NOT_FOUND_404);
        yield (0, supertest_1.default)(src_1.app)
            .get("/blogs")
            .expect(http_status_codes_1.httpStatusCodes.OK_200, []);
    }));
});
