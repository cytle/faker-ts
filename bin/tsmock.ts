import program from 'commander';
import { createServer, tsMock } from '../json-schema-mock';

program
  .version('0.0.1')
  .usage('[options] <file ...>')
  .option('-w, --watch', 'Watch files')
  .option('-p, --port', 'Server listen port', 3000)
  .parse(process.argv);

if (program.watch) {
  createServer(program.args).listen(program.port);
  console.log(`http://localhost:${program.port}`);
} else {
  console.log(JSON.stringify(tsMock(program.args), null, 2));
}
