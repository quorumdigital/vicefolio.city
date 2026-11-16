const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
async function check(records,expected){
 const parent={hidden:true,remove(){this.removed=true},querySelector(){return {textContent:''}}},button={parentElement:parent},status={};
 const context={window:{localizeText:s=>s},CSS:{escape:s=>s},document:{addEventListener(){},querySelector:s=>s.startsWith('[data-dossier-map')?button:status}};
 vm.createContext(context);vm.runInContext(fs.readFileSync('public/map-evidence.js','utf8'),context);
 context.window.MapEvidence.use({records});await context.window.MapEvidence.forEntry('test');
 assert.equal(!parent.hidden&&!parent.removed,expected.visible);
 if(expected.visible)assert.equal(button.href,expected.href);
}
(async()=>{
 await check([{id:'pending',entry:'test'}],{visible:false});
 await check([{id:'bad',entry:'test',xy:[NaN,2]}],{visible:false});
 await check([{id:'pending',entry:'test'},{id:'L1',entry:'test',xy:[1,2]}],{visible:true,href:'#world?pin=L1'});
 await check([{id:'area',entry:'test',searchArea:'Vice City'}],{visible:false});
 await check([{id:'area',entry:'test',searchArea:'Vice City'},...[1,2,3].map(n=>({id:'L'+n,xy:[n,n],area:'Vice City'}))],{visible:true,href:'#world?pin=area'});
 console.log('Five map-link cases passed: absent/invalid locations hidden, valid pin and mapped area focused.');
})().catch(e=>{console.error(e);process.exitCode=1});
