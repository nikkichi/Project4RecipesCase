"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("whatwg-fetch");
function ping() {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/keep_alive/ping`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.ping = ping;
function ping_as_User() {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield fetch(`/api/v1/keep_alive/ping_as_User`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } });
        if (!res.ok)
            throw Error(res.statusText);
        return;
    });
}
exports.ping_as_User = ping_as_User;
//# sourceMappingURL=generated_keep_alive_api.js.map