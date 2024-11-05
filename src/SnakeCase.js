"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnakeCase = void 0;
var NamingConventionsBase_1 = require("./NamingConventionsBase");
/**
 * Converts a string to snake_case format.
 * @param input The input string to be converted.
 * @returns The input string converted to snake_case.
 */
var SnakeCase = /** @class */ (function (_super) {
    __extends(SnakeCase, _super);
    function SnakeCase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SnakeCase.prototype.convert = function (input) {
        var words = this.splitWords(input);
        return words.join('_').toLowerCase();
    };
    return SnakeCase;
}(NamingConventionsBase_1.NamingConventionsBase));
exports.SnakeCase = SnakeCase;
