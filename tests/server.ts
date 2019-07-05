import { getApiFiles } from './getApiFiles';
import { createServer } from './koaServer';

createServer(getApiFiles()).listen(3000);
