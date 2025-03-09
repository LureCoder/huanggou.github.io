// 获取所有的 .tooltip-container 元素
const tooltipContainers = document.querySelectorAll('.tooltip-container');

// 遍历每个 .tooltip-container 元素
tooltipContainers.forEach((container) => {
    const pElement = container.querySelector('p');
    const tooltipElement = container.querySelector('.tooltip');

    // 将 p 元素的文本内容赋值给 tooltip 元素
    tooltipElement.textContent = pElement.textContent;
});

function getVideoCardsByCardId(cardId, cardFilter, action){
    if('5070Ti' == cardId){
        getVideoCards(['./dataset/asus_5070Ti_products.json', './dataset/gigabyte_5070Ti_products.json', './dataset/msi_5070Ti_products.json', './dataset/colorful_5070Ti_products.json', './dataset/others_5070Ti_products.json'], cardFilter, action);
    } else if ('5080' == cardId){
        getVideoCards(['./dataset/asus_5080_products.json', './dataset/gigabyte_5080_products.json', './dataset/msi_5080_products.json', './dataset/colorful_5080_products.json'], cardFilter, action);
    } else if ('5090D' == cardId){
        getVideoCards(['./dataset/asus_5090D_products.json', './dataset/gigabyte_5090D_products.json', './dataset/msi_5090D_products.json', './dataset/colorful_5090D_products.json'], cardFilter, action);
    } else if ('5070' == cardId){
        getVideoCards(['./dataset/asus_5070_products.json', './dataset/gigabyte_5070_products.json', './dataset/msi_5070_products.json', './dataset/colorful_5070_products.json'], cardFilter, action);
    }
}


function getVideoCards(datasetPath, cardFilter, action){
    const level = cardFilter ? cardFilter.显卡等级 : [];
    const brand = cardFilter ? cardFilter.品牌 : [];
    const series = cardFilter ? cardFilter.系列 : [];

    $.each(datasetPath, function (index, jsonPath) {

        $.getJSON(jsonPath, function (data) {
            // 遍历 products 数组
            $.each(data.products, function (index, product) {
                // 获取 parameters 中的节点值
                var parameters = product.parameters;
                var name = product.name;
                var isLevelUndeifned = !parameters.level;
                var pLevelName = !parameters.level || (parameters.level.name || '');
                var pBrandName = !parameters.品牌 || (parameters.品牌 || '');
                var pSeriesName = !parameters.品牌显卡系列 || (parameters.品牌显卡系列 || '');
                
    
                //parameters.level.name
                //level
    
                
                if(action != 'reset'){
                    if (level && level.length > 0 && pLevelName != '' && !level.includes(pLevelName)) {
        
                        if(level.includes("丐版") && isLevelUndeifned){
        
                        } else {
                            console.log('level ' + pLevelName + ' not match with: ' + level);
                            return;
                        }
        
                    }
        
                    if (brand && brand.length > 0 && pBrandName != '' && !brand.includes(pBrandName)) {
                        console.log('level ' + pBrandName + ' not match with: ' + brand);
                        return;
                    }
        
                    if (series && series.length > 0 && pSeriesName != '' && !series.includes(pSeriesName)) {
                        console.log('level ' + pSeriesName + ' not match with: ' + series);
                        return;
                    }
                }
    
                
    
                var levelCode = "";
                if((parameters.level)){
    
    
                    if(parameters.level.value == 1){
                        levelCode = '<a href="" class="ribbon"><i class="fa fa-diamond"></i><span>'+parameters.level.name+'</span></a>';
                    } else if (parameters.level.value == 2){
                        levelCode = '<a href="" class="ribbon"><i class="fa fa-star"></i><span>'+parameters.level.name+'</span></a>';
                    }
                    
                }

                var coreColorClass = "";
                var coreColorTemp = (parameters.核心烤机 || '').replace("~", "").replace("℃", "");
                if(coreColorTemp && coreColorTemp != ''){
                    let coreTemp = Number(coreColorTemp);
                    if(coreTemp < 60){
                        coreColorClass = "temp-range below-60";
                    } else if (coreTemp >= 60 && coreTemp <= 65){
                        coreColorClass = "temp-range between-60-65";
                    } else if (coreTemp > 65 && coreTemp <= 70){
                        coreColorClass = "temp-range between-65-70";
                    } else {
                        coreColorClass = "temp-range above-70";
                    }
                }

                var memColorClass = "";
                var memColorTemp = (parameters.显存烤机 || '').replace("~", "").replace("℃", "");
                if(memColorTemp && memColorTemp != ''){
                    let memTemp = Number(memColorTemp);
                    if(memTemp < 60){
                        memColorClass = "temp-range below-60";
                    } else if (memTemp >= 60 && memTemp <= 65){
                        memColorClass = "temp-range between-60-65";
                    } else if (memTemp > 65 && memTemp <= 70){
                        memColorClass = "temp-range between-65-70";
                    } else {
                        memColorClass = "temp-range above-70";
                    }
                }
                
    
                // 生成 HTML 结构
                var html = '<div class="col-xl-1 pricing-col aic-card">' +
                    '<div class="pricing-card">' +
                    '<div class="pricing-header">' +
                    '<a href="' + (parameters.productURL || '') + '" target="_blank"><img class="card-logo" src="' + (parameters.imageURL || '') + '"/></a>' +
                    // '<h5>Standard</h5>' +
                    // '<a href="" class="ribbon">' +
                    // '<i class="fa fa-star"></i>' +
                    // '<span>Feature</span>' +
                    // '</a>' +
                    levelCode + 
                    '<div class="">' +
                    '<div class="price">' +
                    '<div class="currency"></div>' +
                    '<div class="plan"></div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="pricing-feature">' +
                    '<li class="product-id"><a href="' + (parameters.productURL || '') + '" target="_blank"><p>' + name + '</p></a></li>' +
                    '<li><p>' + (parameters.品牌 || '') + '</p></li>' +
                    '<li><p>' + (parameters.品牌显卡系列 || '') + '</p></li>' +
                    '<li><p>' + (parameters.核心频率 || '') + '</p></li>' +
                    '<li><p>' + (parameters.显卡尺寸 || '') + '</p></li>' +
                    '<li><p>' + (parameters.供电相数 || '') + '</p></li>' +
                    '<li><p>' + (parameters.散热规模 || '') + '</p></li>' +
                    '<li><p>' + (parameters.是否有均热板 || '') + '</p></li>' +
                    '<li class="'+coreColorClass+'"><p>' + (parameters.核心烤机 || '') + '</p></li>' +
                    '<li class="'+memColorClass+'"><p>' + (parameters.显存烤机 || '') + '</p></li>' +
                    '<li><p>' + (parameters.供电接口 || '') + '</p></li>' +
                    '<li><p>' + (parameters.插槽 || '') + '</p></li>' +
                    '<li class="output-port"><p>' + (parameters.输出接口 || '') + '</p></li>' +
                    '<li class="assets"><p>' + (parameters.配件 || '') + '</p></li>' +
                    '<li class="review"><a href="'+(parameters.review[0].reviewURL || '')+'" target="_blank" title="点我"><p>' + (parameters.review[0].tester || '') + '</p></a></li>' +
                    '<li class="others tooltip-container"><p>' + (parameters.其他 || '') + '</p><span class="tooltip">' + (parameters.其他 || '') + '</span></li>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
    
                // 将生成的 HTML 插入到页面中
                $('#product-list').append(html);
            });
        }).fail(function () {
            console.log('加载 JSON 文件失败');
        });
    });

    
}