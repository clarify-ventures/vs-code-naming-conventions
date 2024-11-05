import { SnakeCase } from './SnakeCase';

/**
 * Provides functionality to suggest refactoring for code based on naming conventions.
 */
export class NamingSuggester {
    suggestRefactoring(code: string): any {
        const suggestions: Record<string, string> = {};
        const reasons: Record<string, string> = {};

        // Analyze classes
        const classMatches = code.match(/class\s+([A-Za-z0-9_]+)/g);
        if (classMatches) {
            classMatches.forEach((match) => {
                const className = match.split(' ')[1];
                if (!/^[A-Z][a-zA-Z0-9]*$/.test(className)) {
                    suggestions[className] = className.charAt(0).toUpperCase() + className.slice(1);
                    reasons[className] = 'Class names should be in UpperCamelCase.';
                }
            });
        }

        // Analyze methods
        const methodMatches = code.match(/function\s+([A-Za-z0-9_]+)/g);
        if (methodMatches) {
            methodMatches.forEach((match) => {
                const methodName = match.split(' ')[1];
                if (!/^[a-z][a-zA-Z0-9]*$/.test(methodName)) {
                    suggestions[methodName] = methodName.charAt(0).toLowerCase() + methodName.slice(1);
                    reasons[methodName] = 'Method names should be in camelCase.';
                }
            });
        }

        // Analyze variables
        const variableMatches = code.match(/\$([A-Za-z0-9_]+)/g);
        if (variableMatches) {
            const snakeCaseConverter = new SnakeCase();
            variableMatches.forEach((match) => {
                const varName = match.slice(1);
                const suggestedName = snakeCaseConverter.convert(varName);
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
    }
}
