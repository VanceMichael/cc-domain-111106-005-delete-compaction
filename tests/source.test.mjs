import {test} from 'node:test';
import assert from 'node:assert/strict';
import {inspect,readDeletes} from '../src/source.mjs';
import {readFixture} from '../src/files.mjs';
const sample=await readFixture('deletes.json');
test('原件读取与结构边界',async()=>{

assert.deepEqual(inspect(sample),{deletes:2,positions:1,equalities:1});
assert.throws(()=>readDeletes(Buffer.from('[{"kind":"position","file_id":"x","row":-1}]')),/位置/);
assert.throws(()=>readDeletes(Buffer.from('[{"kind":"other"}]')),/类型/);
assert.deepEqual(readDeletes(Buffer.from('[]')),[]);

});
test('样本读取范围',async()=>{await assert.rejects(readFixture('../package.json'),/越界/);await assert.rejects(readFixture('absent.data'),/ENOENT/);});
