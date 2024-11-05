"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeGenerator = void 0;
/**
 * Generates a code template for an entity with an ID and name property.
 * @param name - The name of the entity to generate the code for.
 * @returns The generated code template for the entity.
 */
var CodeGenerator = /** @class */ (function () {
    function CodeGenerator() {
    }
    CodeGenerator.prototype.generateEntity = function (name) {
        var template = "\n            class ".concat(name, " {\n                private id: number;\n                private name: string;\n\n                getId(): number {\n                    return this.id;\n                }\n            }\n        ");
        return template;
    };
    return CodeGenerator;
}());
exports.CodeGenerator = CodeGenerator;
