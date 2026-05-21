const fs = require('fs');
let html = fs.readFileSync('/workspace/index.html', 'utf8');

html = html.replace(
    '<!-- 部门预警统计 -->\n                <div class="department-stats"></div>',
    `<!-- 部门预警统计 -->
                <div class="department-stats" id="dept-stats">
                    <!-- JS 生成 -->
                </div>`
);

html = html.replace(
    '<!-- 底部公告板 -->\n                <div class="bottom-notice"></div>',
    `<!-- 底部公告板 -->
                <div class="bottom-notice module-box">
                    <div class="module-header" style="margin-bottom: 0;">
                        <div class="module-title">具体单位、预警数量</div>
                        <button class="more-btn" style="margin-right: 10px;">更多 >></button>
                    </div>
                    <div class="notice-list" id="notice-list">
                        <!-- JS 生成 -->
                    </div>
                </div>`
);

fs.writeFileSync('/workspace/index.html', html);
console.log('Updated index.html for center bottom');
