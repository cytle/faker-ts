import * as ts from 'typescript';
import { buildGenerator, JsonSchemaGenerator } from 'typescript-json-schema';
import { fakerGenerate } from './faker';
import { tsWatcher } from './tsWatcher';
import { getTsOptions } from './utils';

export class TsMocker {
  public generator: JsonSchemaGenerator;
  public program: ts.Program;
  constructor(program?: ts.Program) {
    if (program) {
      this.setProgram(program);
    }
  }
  public setProgram(program: ts.Program) {
    const generator = buildGenerator(program, { required: true });
    if (generator === null) {
      throw new Error('generator is null');
    }
    this.program = program;
    this.generator = generator;
  }
  public generateSchema(fullTypeName: string = '*', onlyIncludeFiles?: string[]) {
    const { generator } = this;
    if (fullTypeName === '*') {
      return generator.getSchemaForSymbols(generator.getMainFileSymbols(this.program, onlyIncludeFiles));
    } else {
      return generator.getSchemaForSymbol(fullTypeName);
    }
  }
  public generateMock(fullTypeName, onlyIncludeFiles?: string[]) {
    return fakerGenerate(this.generateSchema(fullTypeName, onlyIncludeFiles));
  }
}

export function tsMockService(files: string[], jsonCompilerOptions?: ts.CompilerOptions, basePath?: string) {
  const mocker = new TsMocker();
  const options = getTsOptions(jsonCompilerOptions, basePath);

  tsWatcher(files, options).on('afterProgramCreate', (p: ts.SemanticDiagnosticsBuilderProgram) => {
    try {
      mocker.setProgram(p.getProgram());
    } catch (error) {
      console.error(error.meesage);
    }
  });
  return mocker;
}

export function tsMock(files: string[], jsonCompilerOptions?: ts.CompilerOptions, basePath?: string) {
  const options = getTsOptions(jsonCompilerOptions, basePath);
  const mocker = new TsMocker(ts.createProgram(files, options));
  return mocker;
}
