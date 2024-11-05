"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamingConventionsBase = void 0;
/**
 * Provides a base class for implementing naming conventions.
 */
var NamingConventionsBase = /** @class */ (function () {
    function NamingConventionsBase() {
    }
    /**
     * Splits the input string into an array of words based on non-alphanumeric characters.
     * @param input The input string to be split.
     * @returns An array of words extracted from the input string.
     */
    NamingConventionsBase.prototype.splitWords = function (input) {
        return input.split(/[^a-zA-Z0-9]/);
    };
    return NamingConventionsBase;
}());
exports.NamingConventionsBase = NamingConventionsBase;
