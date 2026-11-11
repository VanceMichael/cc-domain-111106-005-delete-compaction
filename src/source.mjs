export function readDeletes(bytes) {
 const values=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));
 if(!Array.isArray(values)) throw new Error('删除记录必须为数组');
 for(const d of values) {
  if(d.kind==='position') {
   if(typeof d.file_id!=='string'||!Number.isSafeInteger(d.row)||d.row<0)throw new Error('位置删除无效');
  } else if(d.kind==='equality') {
   if(!Array.isArray(d.field_ids)||!Array.isArray(d.values)||d.field_ids.length!==d.values.length||!/^\d+$/.test(d.delete_sequence)) throw new Error('相等删除结构无效');
  } else throw new Error('删除类型无效');
 }
 return values;
}
export function inspect(bytes) {const values=readDeletes(bytes);return {deletes:values.length,positions:values.filter(d=>d.kind==='position').length,equalities:values.filter(d=>d.kind==='equality').length};}
