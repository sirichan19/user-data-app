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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
var console_1 = require("console");
var userDatadb_1 = require("./adapters/db/userDatadb");
var handler = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    var allUsers, validUsers, invalidUsers, invalidUserData, _i, _a, user, _b, validUsers_1, user, err_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                allUsers = event.users;
                validUsers = [];
                invalidUsers = [];
                invalidUserData = [];
                for (_i = 0, _a = event.users; _i < _a.length; _i++) {
                    user = _a[_i];
                    if (validateUserData(user)) {
                        throw (0, console_1.error)("validation for either phone number or address is not met. please correct the data");
                    }
                    if (user.name === null || user.name === undefined || user.name === "") {
                        invalidUserData.push([user.id, "name is undefined"]);
                    }
                    if (!isValidEmail(user.email)) {
                        invalidUserData.push([user.id, "email is invalid"]);
                    }
                    if (user.age < 18 || user.age > 100) {
                        invalidUserData.push([user.id, "age is invalid"]);
                    }
                    validUsers = allUsers.filter(function (user) { return checkIsValidUser(user); });
                    invalidUsers = allUsers.filter(function (user) { return !checkIsValidUser(user); });
                }
                if (!(validUsers.length > 0)) return [3 /*break*/, 7];
                _c.label = 1;
            case 1:
                _c.trys.push([1, 6, , 7]);
                _b = 0, validUsers_1 = validUsers;
                _c.label = 2;
            case 2:
                if (!(_b < validUsers_1.length)) return [3 /*break*/, 5];
                user = validUsers_1[_b];
                return [4 /*yield*/, (0, userDatadb_1.saveUserDataToDynamoDB)(user)];
            case 3:
                _c.sent();
                console.log("Data successfully saved to dynamoDB for ".concat(user.id));
                _c.label = 4;
            case 4:
                _b++;
                return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 7];
            case 6:
                err_1 = _c.sent();
                console.log("unable to save data to dynamoDB", err_1);
                return [3 /*break*/, 7];
            case 7:
                if (invalidUserData.length !== 0) {
                    console.log("Invalid users: please correct the data for the following users: ".concat(invalidUserData));
                    return [2 /*return*/, invalidUserData];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.handler = handler;
var isValidEmail = function (email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};
var checkIsValidUser = function (user) {
    return user.name !== null && user.name !== undefined && user.name !== "" && isValidEmail(user.email) && user.age >= 18 && user.age <= 100;
};
var isInvalidPhoneNumber = function (phonenumber) {
    var regex = /^\d{10}$/;
    return regex.test(phonenumber.toString());
};
function validateUserData(user) {
    var _a, _b, _c, _d, _e;
    var isInvalidData = false;
    if ((user === null || user === void 0 ? void 0 : user.phonenumber) && isInvalidPhoneNumber(user === null || user === void 0 ? void 0 : user.phonenumber)) {
        isInvalidData = true;
    }
    else if (((_a = user.address) === null || _a === void 0 ? void 0 : _a.street) === null && ((_b = user.address) === null || _b === void 0 ? void 0 : _b.city) === null && ((_c = user.address) === null || _c === void 0 ? void 0 : _c.zipcode) === null) {
        isInvalidData = true;
    }
    else if (((_d = user.address) === null || _d === void 0 ? void 0 : _d.zipcode) && !isvalidZipCode((_e = user.address) === null || _e === void 0 ? void 0 : _e.zipcode)) {
        isInvalidData = true;
    }
    return isInvalidData;
}
function isvalidZipCode(zipcode) {
    var regex = /^\d{5}$/;
    return regex.test(zipcode.toString());
}
