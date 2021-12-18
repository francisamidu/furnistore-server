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
exports.updateCategory = exports.getCategoryStats = exports.getCategories = exports.getCategory = exports.deleteCategory = exports.createCategory = void 0;
// Gets a single Category
const getCategory = ({ categoryId }, req) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getCategory = getCategory;
// Gets all Categories
const getCategories = (context, req) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getCategories = getCategories;
// Gets Category Stats
const getCategoryStats = (context, req) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getCategoryStats = getCategoryStats;
// Creates a single category
const createCategory = ({}, req) => __awaiter(void 0, void 0, void 0, function* () { });
exports.createCategory = createCategory;
// Deletes a single category
const deleteCategory = ({ categoryId }, req) => __awaiter(void 0, void 0, void 0, function* () { });
exports.deleteCategory = deleteCategory;
// Updates a single category
const updateCategory = ({ categoryId }, req) => __awaiter(void 0, void 0, void 0, function* () { });
exports.updateCategory = updateCategory;
