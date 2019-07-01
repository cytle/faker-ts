import { createServer } from '../lib/koaServer';
import { getApiFiles } from './getApiFiles';

createServer(getApiFiles()).listen(3000);
