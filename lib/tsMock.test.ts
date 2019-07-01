import { getApiFiles } from '../tests/getApiFiles';
import { tsMock, tsMockGenerator, tsMockService } from './tsMock';

const files = getApiFiles();

tsMock(files);

const mockGenerator = tsMockGenerator(files);
mockGenerator('IFoo');

const getMock = tsMockService(files);
getMock('IFoo');
