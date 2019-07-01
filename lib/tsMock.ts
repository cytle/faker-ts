import * as ts from 'typescript';
import { fakerGenerate } from './faker';
import { tsSchemaGenerator } from './tsSchema';

export function tsMockService(
  configFileName: string,
  optionsToExtend: ts.CompilerOptions | undefined): (symbol: string) => any;
export function tsMockService(rootFiles: string[], options: ts.CompilerOptions): (symbol: string) => any;
export function tsMockService(rootFiles, options) {
  const getGenerator = tsSchemaGenerator(rootFiles, options);
  return (symbol: string) => {
    const mockGenerator = getGenerator();
    const schema = mockGenerator.getSchemaForSymbol(symbol);
    return fakerGenerate(schema);
  };
}
