import faker from 'faker';
import jsf from 'json-schema-faker';

// faker.locale = 'zh_CN';
jsf.option('useExamplesValue', true);
jsf.option('useDefaultValue', true);
jsf.extend('faker', () => faker);

export const getMock = (schema: any) => jsf.resolve(schema);
export const fakerGenerate = (schema: any) => jsf.generate(schema, []);
