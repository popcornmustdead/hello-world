const fs = require('fs');
let html = fs.readFileSync('/workspace/index.html', 'utf8');

html = html.replace(
    '<!-- 5个环形图模块 -->',
    `<div class="module-box" id="right-module-1">
                    <div class="module-header"><div class="module-title">全局</div></div>
                    <div class="chart-container" id="chart-1"></div>
                </div>
                <div class="module-box" id="right-module-2">
                    <div class="module-header"><div class="module-title">四川地区</div></div>
                    <div class="chart-container" id="chart-2"></div>
                </div>
                <div class="module-box" id="right-module-3">
                    <div class="module-header"><div class="module-title">重庆地区</div></div>
                    <div class="chart-container" id="chart-3"></div>
                </div>
                <div class="module-box" id="right-module-4">
                    <div class="module-header"><div class="module-title">贵州地区</div></div>
                    <div class="chart-container" id="chart-4"></div>
                </div>
                <div class="module-box" id="right-module-5">
                    <div class="module-header"><div class="module-title">处置情况</div></div>
                    <div class="chart-container" id="chart-5"></div>
                </div>`
);

fs.writeFileSync('/workspace/index.html', html);
console.log('Updated index.html for right panel');
