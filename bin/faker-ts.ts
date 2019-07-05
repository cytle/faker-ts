#!/usr/bin/env node

import program from 'commander';
import { tsMock } from '../faker-ts';

program
  .version('0.0.1');

program
  .usage('<file> <symbol>')
  // tslint:disable-next-line:variable-name
  .action((file, symbol) => {
    const mocker = tsMock([file]);
    console.log(JSON.stringify(mocker.generateMock(symbol), null, 2));
  });

// program
//   .command('serve <file>')
//   .description('Http Mock Server')
//   .option('-p, --port', 'Server listen port', parseInt)
//   .action((file, { port = 3000 }) => {
//     console.log(`http://localhost:${port}`);
//     createServer([file]).listen(port);
//   });

program.parse(process.argv);
