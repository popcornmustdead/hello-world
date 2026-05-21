// 初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('Dashboard initialized');
    updateTime();
    setInterval(updateTime, 1000);
});

function updateTime() {
    const timeElement = document.getElementById('current-time');
    if (!timeElement) return;
    
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    timeElement.textContent = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 左侧面板数据生成
const leftPanelTitles = ['零小工程', '项目2', '项目3', '项目4', '项目5'];
const riskCategories = ['规避招标类', '签证变更类', '围标串标类', '资金支付类', '利益相关类', '质量与履约类'];
const warningLevels = [
    { name: '红色预警', class: 'level-red' },
    { name: '橙色预警', class: 'level-orange' },
    { name: '黄色预警', class: 'level-yellow' }
];
const actions = ['建议整改', '立即停工', '约谈负责人', '罚款处理', '持续观察'];

function generateRandomData(count) {
    const data = [];
    for (let i = 0; i < count; i++) {
        const risk = riskCategories[Math.floor(Math.random() * riskCategories.length)];
        const level = warningLevels[Math.floor(Math.random() * warningLevels.length)];
        const num = Math.floor(Math.random() * 50) + 1;
        const action = actions[Math.floor(Math.random() * actions.length)];
        data.push({ risk, level, num, action });
    }
    return data;
}

function renderLeftPanel() {
    leftPanelTitles.forEach((title, index) => {
        const container = document.getElementById(`left-module-${index + 1}`);
        if (!container) return;
        
        const warning1 = Math.floor(Math.random() * 100);
        const warning2 = Math.floor(Math.random() * 100);
        const data = generateRandomData(3); // 显示4行数据
        
        let rowsHtml = '';
        data.forEach(item => {
            rowsHtml += `
                <div class="table-row">
                    <div class="table-cell col-1" title="${item.risk}">${item.risk}</div>
                    <div class="table-cell col-2 ${item.level.class}">${item.level.name}</div>
                    <div class="table-cell col-3">${item.num}</div>
                    <div class="table-cell col-4" title="${item.action}">${item.action}</div>
                </div>
            `;
        });

        container.innerHTML = `
            <div class="module-header">
                <div class="module-title">${title}</div>
                <div class="module-warning-counts">
                    预警①<span class="warning-count"><span>${warning1}</span>个</span>
                    预警②<span class="warning-count"><span>${warning2}</span>个</span>
                </div>
            </div>
            <div class="data-table">
                <div class="table-header">
                    <div class="table-cell col-1">风险类别</div>
                    <div class="table-cell col-2">预警等级</div>
                    <div class="table-cell col-3">数量</div>
                    <div class="table-cell col-4">处置</div>
                </div>
                ${rowsHtml}
            </div>
            <div class="more-btn-container">
                <button class="more-btn">更多 >></button>
            </div>
        `;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderLeftPanel();
});

// 右侧面板图表生成
function renderRightPanel() {
    const commonOptions = {
        tooltip: { trigger: 'item' },
        legend: {
            orient: 'vertical',
            right: 10,
            top: 'center',
            textStyle: { color: '#fff', fontSize: 10 },
            itemWidth: 10,
            itemHeight: 10
        },
        color: ['#00f3ff', '#0075ff', '#ffb700', '#ff4d4f'],
        series: [
            {
                type: 'pie',
                radius: ['50%', '80%'],
                center: ['35%', '50%'],
                avoidLabelOverlap: false,
                label: { show: false, position: 'center' },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: '#fff'
                    }
                },
                labelLine: { show: false },
                data: []
            }
        ]
    };

    const categories1 = ['零小数量', '项目2', '项目3', '项目4'];
    const categories2 = ['单位整改', '约谈提醒', '线索立案', '其他办结'];

    for (let i = 1; i <= 5; i++) {
        const chartDom = document.getElementById(`chart-${i}`);
        if (!chartDom) continue;
        
        const myChart = echarts.init(chartDom);
        const option = JSON.parse(JSON.stringify(commonOptions));
        
        const categories = i === 5 ? categories2 : categories1;
        const data = categories.map(name => ({
            name: name,
            value: Math.floor(Math.random() * 100) + 20
        }));
        
        option.series[0].data = data;
        myChart.setOption(option);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderRightPanel();
});

// 中间地图生成
function renderCenterMap() {
    const chartDom = document.getElementById('main-map');
    if (!chartDom) return;
    
    const myChart = echarts.init(chartDom);
    
    // 注册地图
    echarts.registerMap('SC_CQ_GZ', mapData);
    
    // 标记点数据 (例如重庆附近)
    const scatterData = [
        { name: '预警点', value: [106.551556, 29.563009, 100] }
    ];

    const option = {
        tooltip: {
            trigger: 'item',
            triggerOn: 'click',
            backgroundColor: 'rgba(10, 30, 70, 0.9)',
            borderColor: '#00f3ff',
            borderWidth: 1,
            textStyle: { color: '#fff' },
            formatter: function (params) {
                if (params.seriesType === 'effectScatter') {
                    return `
                        <div style="padding: 10px;">
                            <div style="font-weight: bold; color: #00f3ff; margin-bottom: 10px; border-bottom: 1px solid #00f3ff; padding-bottom: 5px;">预警单位</div>
                            <div>单位名称：成都车务段</div>
                            <div>预警数量：12 个</div>
                            <div>处理状态：待处理</div>
                        </div>
                    `;
                }
                return params.name;
            }
        },
        geo: {
            map: 'SC_CQ_GZ',
            roam: true,
            zoom: 1.2,
            center: [105.5, 28.5],
            itemStyle: {
                areaColor: 'rgba(0, 100, 255, 0.2)',
                borderColor: '#00f3ff',
                borderWidth: 1,
                shadowColor: 'rgba(0, 243, 255, 0.5)',
                shadowBlur: 10
            },
            emphasis: {
                itemStyle: {
                    areaColor: 'rgba(0, 243, 255, 0.5)'
                },
                label: {
                    show: true,
                    color: '#fff'
                }
            },
            label: {
                show: true,
                color: '#00f3ff',
                fontSize: 10
            }
        },
        series: [
            {
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: scatterData,
                symbolSize: 20,
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke',
                    scale: 4
                },
                itemStyle: {
                    color: '#ffb700',
                    shadowBlur: 10,
                    shadowColor: '#ffb700'
                },
                label: {
                    show: true,
                    formatter: '{b}',
                    position: 'right',
                    color: '#ffb700',
                    fontWeight: 'bold'
                }
            }
        ]
    };
    
    myChart.setOption(option);
}

document.addEventListener('DOMContentLoaded', () => {
    renderCenterMap();
});

// 中间底部数据生成
function renderCenterBottom() {
    const depts = ['车务', '客运', '机务', '工务', '电务', '供电', '车辆', '非运输', '其他部门'];
    const statsContainer = document.getElementById('dept-stats');
    
    if (statsContainer) {
        let statsHtml = '';
        depts.forEach(dept => {
            const val = Math.floor(Math.random() * 50);
            statsHtml += `
                <div class="dept-card">
                    <div class="dept-name">${dept}</div>
                    <div class="dept-value">${val}<span class="dept-unit">个</span></div>
                </div>
            `;
        });
        statsContainer.innerHTML = statsHtml;
    }

    const noticeContainer = document.getElementById('notice-list');
    if (noticeContainer) {
        const units = ['成都机务段', '重庆客运段', '贵阳工务段', '成都电务段', '重庆供电段'];
        let noticeHtml = '';
        units.forEach(unit => {
            const val = Math.floor(Math.random() * 20) + 1;
            noticeHtml += `
                <div class="notice-item">
                    <div class="notice-unit">${unit}</div>
                    <div class="notice-value">预警数量：${val} 个</div>
                </div>
            `;
        });
        noticeContainer.innerHTML = noticeHtml;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderCenterBottom();
});
