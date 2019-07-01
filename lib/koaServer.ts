import * as fs from 'fs';
import Koa from 'koa';
import Router from 'koa-router';
import * as ts from 'typescript';
import { tsMockService } from './tsMock';

const app = new Koa();
const router = new Router();

console.log(process.cwd());

const currentDirectoryFiles = fs
  .readdirSync(process.cwd())
  .filter(
    (fileName) =>
      fileName.length >= 3 && fileName.substr(fileName.length - 3, 3) === '.ts',
  );

const getMock = tsMockService(currentDirectoryFiles, {
  target: ts.ScriptTarget.ES5,
  module: ts.ModuleKind.CommonJS,
  moduleResolution: ts.ModuleResolutionKind.NodeJs,
  outDir: 'dist',
  isolatedModules: false,
  esModuleInterop: true,
  experimentalDecorators: true,
  emitDecoratorMetadata: true,
  declaration: true,
  noImplicitAny: false,
  suppressImplicitAnyIndexErrors: true,
  strictNullChecks: true,
  noImplicitReturns: true,
  noFallthroughCasesInSwitch: true,
  noUnusedLocals: true,
  noUnusedParameters: true,
  removeComments: true,
  noLib: false,
  preserveConstEnums: true,
  sourceMap: true,
  watch: false,
  typeRoots : ['node_modules/@types'],
});

router.get('/api', async (ctx) => {
  try {
    const { api = 'IFoo' } = ctx.query;
    ctx.body = JSON.stringify(getMock(api));
  } catch (error) {
    ctx.body = { msg: error.message };
  }
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
app.onerror = (err) => {
  console.error(err);
};
