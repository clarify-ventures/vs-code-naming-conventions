/**
 * Generates a code template for an entity with an ID and name property.
 * @param name - The name of the entity to generate the code for.
 * @returns The generated code template for the entity.
 */
export class CodeGenerator {
    generateEntity(name: string): string {
        const template = `
            class ${name} {
                private id: number;
                private name: string;

                getId(): number {
                    return this.id;
                }
            }
        `;
        return template;
    }
}
