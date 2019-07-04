import faker from 'faker';
import jsf from 'json-schema-faker';
import { Definition } from 'typescript-json-schema';

// faker.locale = 'zh_CN';
jsf.option('useExamplesValue', true);
jsf.option('useDefaultValue', true);
jsf.extend('faker', () => faker);

export const getMock = (schema: any) => jsf.resolve(schema);
export const fakerGenerate = (schema: Definition) => jsf.generate(schema, []);
