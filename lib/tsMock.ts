import * as ts from 'typescript';
import { fakerGenerate } from './faker';
import { tsSchemaWatcher } from './tsSchema';

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
