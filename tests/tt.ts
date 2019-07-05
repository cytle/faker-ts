import jsf from 'json-schema-faker';
import * as ts from 'typescript';
import { generateSchema } from 'typescript-json-schema';

export function tsMock(symbol, file: string, compilerOptions: ts.CompilerOptions) {
  const program = ts.createProgram([file], compilerOptions);
  const schema = generateSchema(program, symbol);
  return jsf.generate(schema, []);
}
