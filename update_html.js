const fs = require('fs');
let html = fs.readFileSync('/workspace/index.html', 'utf8');

html = html.replace(
    '<!-- 5个列表模块 -->',
    `<div class="module-box" id="left-module-1"></div>
                <div class="module-box" id="left-module-2"></div>
                <div class="module-box" id="left-module-3"></div>
                <div class="module-box" id="left-module-4"></div>
                <div class="module-box" id="left-module-5"></div>`
);

fs.writeFileSync('/workspace/index.html', html);
console.log('Updated index.html');
