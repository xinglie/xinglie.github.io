/*!1.0.5 kooboy_li@163.com*/
import e from"../../lib/agent.js";let t=/<strong>([\s\S]+?)<\/strong><span>(\d+)\u6708(\d+)\u65e5<\/span>/g,a=/(^|-)0/g;export default{queryWorkAndHolidays:async t=>{let r=t.getFullYear(),i=new Date(r+1,0,1),l=await e.request(`https://timor.tech/api/holiday/year/${r}`,i.getTime()-t.getTime()),s=JSON.parse(l),o={},n={};if(0==s.code)for(let e in s.holiday){s.holiday[e].holiday?n[`${r}-${e.replace(a,"$1")}`]=1:o[`${r}-${e.replace(a,"$1")}`]=1}return{workdays:o,holidays:n}},querySolarTerms:async()=>{let a=new Date,r=a.getFullYear(),i=new Date(r+1,0,1),l=await e.request(`https://jieqi.51240.com/${r}__jieqi/`,i.getTime()-a.getTime(),!0),s={};return l.replace(t,(e,t,a,i)=>(s[`${r}-${parseInt(a,10)}-${parseInt(i,10)}`]=t,e)),s}};