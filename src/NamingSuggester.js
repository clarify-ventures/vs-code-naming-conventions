"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamingSuggester = void 0;
var SnakeCase_1 = require("./SnakeCase");
/**
 * Provides functionality to suggest refactoring for code based on naming conventions.
 */
var NamingSuggester = /** @class */ (function () {
    function NamingSuggester() {
    }
    NamingSuggester.prototype.suggestRefactoring = function (code) {
        var suggestions = {};
        var reasons = {};
        // Analyze classes
        var classMatches = code.match(/class\s+([A-Za-z0-9_]+)/g);
        if (classMatches) {
            classMatches.forEach(function (match) {
                var className = match.split(' ')[1];
                if (!/^[A-Z][a-zA-Z0-9]*$/.test(className)) {
                    suggestions[className] = className.charAt(0).toUpperCase() + className.slice(1);
                    reasons[className] = 'Class names should be in UpperCamelCase.';
                }
            });
        }
        // Analyze methods
        var methodMatches = code.match(/function\s+([A-Za-z0-9_]+)/g);
        if (methodMatches) {
            methodMatches.forEach(function (match) {
                var methodName = match.split(' ')[1];
                if (!/^[a-z][a-zA-Z0-9]*$/.test(methodName)) {
                    suggestions[methodName] = methodName.charAt(0).toLowerCase() + methodName.slice(1);
                    reasons[methodName] = 'Method names should be in camelCase.';
                }
            });
        }
        // Analyze variables
        var variableMatches = code.match(/\$([A-Za-z0-9_]+)/g);
        if (variableMatches) {
            var snakeCaseConverter_1 = new SnakeCase_1.SnakeCase();
            variableMatches.forEach(function (match) {
                var varName = match.slice(1);
                var suggestedName = snakeCaseConverter_1.convert(varName);
                if (varName !== suggestedName) {
                    suggestions[varName] = suggestedName;
                    reasons[varName] = 'Variable names should be in snake_case.';
                }
            });
        }
        return {
            original: code,
            suggested: suggestions,
            reasons: reasons
        };
    };
    return NamingSuggester;
}());
exports.NamingSuggester = NamingSuggester;
