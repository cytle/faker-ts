import faker from 'faker';
import jsf from 'json-schema-faker';
import * as ts from 'typescript';

// import { resolve } from 'path';
import { generateSchema } from 'typescript-json-schema';

faker.locale = 'zh_CN';
// optionally pass argument to schema generator
// const settings: TJS.PartialArgs = {
//     required: true,
// };

// optionally pass ts compiler options
// const compilerOptions: TJS.CompilerOptions = {
//     strictNullChecks: true,
// };

// optionally pass a base path
// const program = TJS.getProgramFromFiles([resolve('tests/my-file.ts')], compilerOptions);

// console.log(JSON.stringify(schema, null, 2));
// schema.properties.title.faker = 'internet.email';
// use the async-version (preferred way)
jsf.option('useExamplesValue', true);
jsf.option('useDefaultValue', true);

jsf.extend('faker', () => faker);
export const getMock = (program: ts.Program) => {
  // We can either get the schema for one file and one type...
  const schema = generateSchema(program, 'IFoo');
  return jsf.resolve(schema);
};

// ... or a generator that lets us incrementally get more schemas

// const generator = TJS.buildGenerator(program, settings);

// // all symbols
// const symbols = generator.getUserSymbols();

// // Get symbols for different types from generator.
// generator.getSchemaForSymbol('MyType');
// generator.getSchemaForSymbol('AnotherType');

// json-schema to rap
