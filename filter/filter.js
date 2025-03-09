// 定义 JSON 数据
const filterData = {
    "品牌": ["华硕", "微星", "技嘉", "七彩虹", "影驰", "耕升", "索泰", "万丽"],
    "显卡等级": ["旗舰", "次旗舰", "中端", "丐版"], //1，2，3，4
    "系列": ["ROG - 玩家国度", "TUF GAMING - 电竞特工", "Prime - 大师系列", 
        "AORUS - 超级雕", "GAMING - 魔鹰", "EAGLE - 猎鹰", "AERO - 雪鹰", "WINDFORCE - 风魔", 
        "SHADOW - 幻影师", "INSPIRE - 硬派师", "VANGUARD - 神龙", "SUPRIM - 超龙", "VENTUS - 万图师", "GAMING - 魔龙",  
        "iGame系列", "战斧系列", 
        "圣刃", "魔刃", "金属大师", "名人堂", "星耀", 
        "AX电竞判客", 
        "追风", 
        "AMP", "SOLID CORE", 
        "星舰", "星际", "星云"
    ]
};

// 动态生成过滤条件 HTML
const filterContainer = document.getElementById('filter-container');

for (const category in filterData) {
    const filterGroup = document.createElement('div');
    filterGroup.classList.add('filter-group');

    const categoryLabel = document.createElement('label');
    categoryLabel.textContent = category;
    filterGroup.appendChild(categoryLabel);

    filterData[category].forEach((option) => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = category;
        checkbox.value = option;
        checkbox.id = option.toLowerCase().replace(' ', '-');
        filterGroup.appendChild(checkbox);

        const optionLabel = document.createElement('label');
        optionLabel.textContent = option;
        optionLabel.htmlFor = option.toLowerCase().replace(' ', '-');
        filterGroup.appendChild(optionLabel);
    });

    filterContainer.appendChild(filterGroup);
}

// 处理提交过滤条件的函数
function submitFilters() {

    $('#product-list div[class*="aic-card"]').remove();

    const selectedFilters = {};
    const filterGroups = document.querySelectorAll('.filter-group');
    filterGroups.forEach((group) => {
        const category = group.querySelector('label').textContent;
        const checkboxes = group.querySelectorAll('input[type="checkbox"]:checked');
        const values = Array.from(checkboxes).map(checkbox => checkbox.value);
        if (values.length > 0) {
            selectedFilters[category] = values;
        }
    });
    console.log('选择的过滤条件:', selectedFilters);
    // 这里可以添加将数据发送到服务器的代码

    getVideoCardsByCardId(cardId, selectedFilters, 'filter');
}

function resetFilters() {

    $('#product-list div[class*="aic-card"]').remove();
    
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });

    getVideoCardsByCardId(cardId, undefined, 'reset');
}