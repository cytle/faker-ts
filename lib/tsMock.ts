import * as ts from 'typescript';
import { fakerGenerate } from './faker';
import { tsSchema, tsSchemaGenerator, tsSchemaWatcher } from './tsSchema';

export function tsMockService(files: string[], jsonCompilerOptions?: ts.CompilerOptions, basePath?: string) {
  const getGenerator = tsSchemaWatcher(files, jsonCompilerOptions, basePath);
  return (symbol: string) => {
    const mockGenerator = getGenerator();
    if (mockGenerator) {
      const schema = mockGenerator.getSchemaForSymbol(symbol);
      return fakerGenerate(schema);
    }
    throw new Error('mockGenerator is null');
  };
}

export function tsMock(files: string[], jsonCompilerOptions?: ts.CompilerOptions, basePath?: string) {
  return fakerGenerate(tsSchema(files, jsonCompilerOptions, basePath));
}

export function tsMockGenerator(files: string[], jsonCompilerOptions?: ts.CompilerOptions, basePath?: string) {
  const mockGenerator = tsSchemaGenerator(files, jsonCompilerOptions, basePath);
  return (symbol: string) => {
    if (mockGenerator) {
      const schema = mockGenerator.getSchemaForSymbol(symbol);
      return fakerGenerate(schema);
    }
    throw new Error('mockGenerator is null');
  };
}
