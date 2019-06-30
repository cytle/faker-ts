import faker from 'faker';
import jsf from 'json-schema-faker';
import { resolve } from 'path';
import * as TJS from 'typescript-json-schema';

faker.locale = 'zh_CN';
// optionally pass argument to schema generator
const settings: TJS.PartialArgs = {
    required: true,
};

// optionally pass ts compiler options
const compilerOptions: TJS.CompilerOptions = {
    strictNullChecks: true,
};

// optionally pass a base path
const basePath = './my-dir';

const program = TJS.getProgramFromFiles([resolve('packages/group-buy-order-list/types.ts')], compilerOptions, basePath);

// We can either get the schema for one file and one type...
const schema = TJS.generateSchema(program, 'OrderListApi', settings);

console.log(JSON.stringify(schema, null, 2));
// schema.properties.title.faker = 'internet.email';
// use the async-version (preferred way)
jsf.option('useExamplesValue', true);
jsf.option('useDefaultValue', true);

console.log(jsf.option('useExamplesValue'));

jsf.extend('faker', () => faker);
jsf.resolve(schema).then((sample) => {
  console.log(JSON.stringify(sample, null, 2));
  // "[object Object]"

  // "John Doe"
});

// ... or a generator that lets us incrementally get more schemas

// const generator = TJS.buildGenerator(program, settings);

// // all symbols
// const symbols = generator.getUserSymbols();

// // Get symbols for different types from generator.
// generator.getSchemaForSymbol('MyType');
// generator.getSchemaForSymbol('AnotherType');

// json-schema to rap
