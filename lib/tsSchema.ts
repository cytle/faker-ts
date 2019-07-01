import * as ts from 'typescript';
import { buildGenerator, JsonSchemaGenerator, PartialArgs } from 'typescript-json-schema';
import { tsWatcher } from './tsWatcher';

export function tsSchemaGenerator(
  configFileName: string,
  optionsToExtend: ts.CompilerOptions | undefined): () => JsonSchemaGenerator;
export function tsSchemaGenerator(rootFiles: string[], options: ts.CompilerOptions): () => JsonSchemaGenerator;
export function tsSchemaGenerator(rootFiles, options) {
  let mockGenerator: JsonSchemaGenerator;

  const settings: PartialArgs = {
      required: true,
  };
  tsWatcher(rootFiles, options).on('', (p: ts.SemanticDiagnosticsBuilderProgram) => {
    const generator = buildGenerator(p.getProgram(), settings);
    if (generator) {
      mockGenerator = generator;
    }
  });
  return () => mockGenerator;
}
