/**
 * Provides a base class for implementing naming conventions.
 */
export abstract class NamingConventionsBase {
    /**
     * Converts the given input string to a new string based on the naming convention implementation.
     * @param input The input string to be converted.
     * @returns The converted string.
     */
    abstract convert(input: string): string;
    /**
     * Converts the given input string to a new string based on the naming convention implementation.
     * @param input The input string to be converted.
     * @returns The converted string.
     */
    abstract convert(input: string): string;

    /**
     * Splits the input string into an array of words based on non-alphanumeric characters.
     * @param input The input string to be split.
     * @returns An array of words extracted from the input string.
     */
    protected splitWords(input: string): string[] {
        return input.split(/[^a-zA-Z0-9]/);
    }
}
