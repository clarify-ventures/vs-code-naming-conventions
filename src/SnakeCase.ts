import { NamingConventionsBase } from './NamingConventionsBase';

/**
 * Converts a string to snake_case format.
 * @param input The input string to be converted.
 * @returns The input string converted to snake_case.
 */
export class SnakeCase extends NamingConventionsBase {
    convert(input: string): string {
        const words = this.splitWords(input);
        return words.join('_').toLowerCase();
    }
}
