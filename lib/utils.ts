import * as ts from 'typescript';

export function getTsOptions(jsonCompilerOptions: ts.CompilerOptions = {}, basePath: string = './') {
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
