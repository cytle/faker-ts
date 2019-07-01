import * as ts from 'typescript';
import { buildGenerator, generateSchema, JsonSchemaGenerator, PartialArgs } from 'typescript-json-schema';
import { tsWatcher } from './tsWatcher';

function getTsOptions(jsonCompilerOptions: ts.CompilerOptions = {}, basePath: string = './') {
  const compilerOptions = ts.convertCompilerOptionsFromJson(jsonCompilerOptions, basePath).options;
  return {
    noEmit: true,
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.CommonJS,
    allowUnusedLabels: true,
    ...compilerOptions,
  };
}

export function tsSchemaWatcher(files: string[], jsonCompilerOptions?: ts.CompilerOptions, basePath?: string) {
  const options = getTsOptions(jsonCompilerOptions, basePath);
  const settings: PartialArgs = {
      required: true,
  };
  let mockGenerator: JsonSchemaGenerator | null = null;
  let program: ts.Program;

  tsWatcher(files, options).on('afterProgramCreate', (p: ts.SemanticDiagnosticsBuilderProgram) => {
    program = p.getProgram();
    const generator = buildGenerator(program, settings);
    if (generator) {
      mockGenerator = generator;
    }
  });
  function getMockGenerator() {
    return mockGenerator;
  }
  getMockGenerator.getProgram = () => program;
  return getMockGenerator;
}

export function tsSchemaGenerator(files: string[], jsonCompilerOptions?: ts.CompilerOptions, basePath?: string) {
  const options = getTsOptions(jsonCompilerOptions, basePath);
  const settings: PartialArgs = {
    required: true,
  };
  const program = ts.createProgram(files, options);
  return buildGenerator(program, settings);
}

export function tsSchema(files: string[], jsonCompilerOptions?: ts.CompilerOptions, basePath?: string) {
  const options = getTsOptions(jsonCompilerOptions, basePath);
  const settings: PartialArgs = {
    required: true,
  };
  const program = ts.createProgram(files, options);
  return generateSchema(program, '*', settings);
}