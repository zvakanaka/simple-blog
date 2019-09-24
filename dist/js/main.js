/* global marked */function getFile(a,b,c){var d=new XMLHttpRequest;d.onreadystatechange=function(){4===d.readyState&&200===d.status&&(c?b(JSON.parse(d.responseText)):b(d.responseText))},d.open('GET',a,!0),d.send()}function setMarkdown(a,b){// file contains extension, pushState creates entry in history
getFile(`posts/${a}`,function(b){document.querySelector('.markdown-body').innerHTML=marked(b);// dispatch event for plugin-html5-video.js
const c=new CustomEvent('postLoaded',{detail:{name:a}});document.dispatchEvent(c);// highlight post in sidebar
const d=document.querySelector('.displayed-article');d&&d.classList.remove('displayed-article');const e=document.getElementById(`${a}`);e&&e.classList.add('displayed-article')}),b&&history.pushState?history.pushState(null,null,`#${a}`):history.replaceState?history.replaceState(null,null,`#${a}`):location.hash=`#${a}`}function getHash(){return window.location.hash?window.location.hash.substring(1):null}window.onhashchange=function(){// handle browser back/forward
setMarkdown(getHash(),!1)},getFile('posts.json',function(a){// load posts into nav
let b=document.createElement('ul');a.forEach(function(a){let c=document.createElement('li');if(a.hasOwnProperty('folder')){c.classList.add('folder'),c.textContent=a.folder.split('_').join(' ');const b=document.createElement('ul');a.articles.forEach(function(c){const d=document.createElement('li');// strip extension
d.textContent=c.substr(0,c.lastIndexOf('.')).split('_').join(' '),d.id=`${a.folder}/${c}`,d.classList.add('file'),d.addEventListener('click',function(){setMarkdown(`${a.folder}/${c}`,!0)}),b.appendChild(d)}),c.appendChild(b)}else if(a.hasOwnProperty('file')){const b=a.file;// strip extension
c.textContent=b.substr(0,b.lastIndexOf('.')).split('_').join(' '),c.id=b,c.classList.add('file'),c.addEventListener('click',function(){setMarkdown(b,!0)})}else if('string'==typeof a){const b=a;// strip extension
c.textContent=b.substr(0,b.lastIndexOf('.')).split('_').join(' '),c.id=b,c.classList.add('file'),c.addEventListener('click',function(){setMarkdown(b,!0)})}else throw new Error('Unhandled post object format',a);b.appendChild(c)}),document.querySelector('.navigation').appendChild(b);const c=a.reduce(function(a,b){'object'==typeof b&&b.hasOwnProperty('folder')?`${b.folder}/${b.articles[0]}`:b.file;if('object'==typeof b&&b.hasOwnProperty('folder'))b.articles.forEach(function(c){a.push(`${b.folder}/${c}`)});else if('object'==typeof b&&b.hasOwnProperty('file'))a.push(b.file);else if('string'==typeof b)a.push(b);else throw new Error('Invalid post format',b);return a},[]),d=getHash();if(d){// load post in url hash
const a=c.filter(function(a){// match with or without extension
return a.substr(0,a.lastIndexOf('.'))===d||a===d});a.forEach(function(a){// should be only one item in loop
setMarkdown(a,!1)}),0===a.length&&setMarkdown(d,!1)}else setMarkdown(c[0],!1);// default - no hash specifies article
},!0);