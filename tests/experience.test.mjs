import {test} from 'node:test';
import assert from 'node:assert/strict';
import {experience,renderExperience} from '../experience.mjs';

for(const lang of ['id','en']) {
 test(`experience content boundaries ${lang}`,()=>{
  assert.deepEqual(experience.map(e=>e.key),['gameloft','accelbyte','golfer','independent']);
  const draft=renderExperience(lang,true,'Title','Work');
  const publicHtml=renderExperience(lang,false,'Title','Work');
  assert.equal((draft.match(/<article/g)||[]).length,4);
  assert.equal((publicHtml.match(/<article/g)||[]).length,4);
  assert.match(publicHtml,/data-experience="independent"/);
  assert.ok(!/experience-editorial|Awaiting|Menunggu|Draf|Draft/.test(publicHtml));
  assert.match(draft,/href="https:\/\/topgolfer.app\/zh"/);
  assert.ok(!/<img|<time|intoch|current employ|current workplace/i.test(draft));
  for(const entry of experience){
   const wordCount=(entry.contribution[lang]+' '+entry.connection[lang]).split(/\s+/).length;
   assert.ok(wordCount>=40&&wordCount<=65,`${entry.key} ${lang}: ${wordCount} words`);
  }
 });
}
