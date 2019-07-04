import program from 'commander';
import { createServer, tsMock } from '../json-schema-mock';

program
  .version('0.0.1');

program
  .command('mock <symbol> <file>')
  .description('Mock data')
  // tslint:disable-next-line:variable-name
  .action((symbol, file) => {
    const mocker = tsMock([file]);
    console.log(JSON.stringify(mocker.generateMock(symbol), null, 2));
  });

program
  .command('serve <file>')
  .description('Http Mock Server')
  .option('-p, --port', 'Server listen port', parseInt)
  .action((file, { port = 3000 }) => {
    console.log(`http://localhost:${port}`);
    createServer([file]).listen(port);
  });

program.parse(process.argv);
