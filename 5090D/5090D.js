// 获取所有的 .tooltip-container 元素
const tooltipContainers = document.querySelectorAll('.tooltip-container');

// 遍历每个 .tooltip-container 元素
tooltipContainers.forEach((container) => {
    const pElement = container.querySelector('p');
    const tooltipElement = container.querySelector('.tooltip');

    // 将 p 元素的文本内容赋值给 tooltip 元素
    tooltipElement.textContent = pElement.textContent;
});

function getVideoCardsByCardId(cardId, cardFilter, action) {
    if ('5070Ti' == cardId) {
        getVideoCards(['./dataset/5070Ti.json'], cardFilter, action);
    } else if ('5080' == cardId) {
        getVideoCards(['./dataset/asus_5080_products.json', './dataset/gigabyte_5080_products.json', './dataset/msi_5080_products.json'], cardFilter, action);
    } else if ('5090' == cardId) {
        getVideoCards(['./dataset/asus_5090D_products.json', './dataset/gigabyte_5090D_products.json', './dataset/msi_5090D_products.json'], cardFilter, action);
    }
}


function getVideoCards(datasetPath, cardFilter, action) {
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


                if (action != 'reset') {
                    if (level && level.length > 0 && pLevelName != '' && !level.includes(pLevelName)) {

                        if (level.includes("丐版") && isLevelUndeifned) {

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
                if ((parameters.level)) {


                    if (parameters.level.value == 1) {
                        levelCode = '<a href="" class="ribbon"><i class="fa fa-diamond"></i><span>' + parameters.level.name + '</span></a>';
                    } else if (parameters.level.value == 2) {
                        levelCode = '<a href="" class="ribbon"><i class="fa fa-star"></i><span>' + parameters.level.name + '</span></a>';
                    }

                }

                //'<a href="" class="ribbon"><i class="fa fa-diamond"></i><span>'+parameters.level.name+'</span></a>';
                // 型号
                var logoDiv = $('<div>');
                // 创建一个 img 元素，并设置其 src 和 alt 属性
                var imgElement = $('<img class="card-logo-img">').attr({
                    src: (parameters.imageURL || ''),
                    alt: 'Placeholder Image'
                });
                logoDiv.append(imgElement);
                logoDiv.append($(levelCode));

                var logo = $('<td>');
                logo.append(logoDiv);

                $('#card-logo-header').append(logo);

                // Name
                var logo = $('<td><p>' + name + '</p></td>');
                $('#card-name-header').append(logo);

                // 品牌
                var brandCell = $('<td><p>' +parameters['品牌'] + '</p></td>');
                $('#brandRow').append(brandCell);

                // 品牌显卡系列
                var brandSeriesCell = $('<td><p>' +(parameters['品牌显卡系列'] + '</p></td>'));
                $('#brandSeriesRow').append(brandSeriesCell);

                // 核心频率
                var coreFrequencyCell = $('<td><p>' +(parameters['核心频率'] + '</p></td>'));
                $('#coreFrequencyRow').append(coreFrequencyCell);

                // 显卡尺寸
                var cardSizeCell = $('<td><p>' +(parameters['显卡尺寸'] + '</p></td>'));
                $('#cardSizeRow').append(cardSizeCell);

                // 供电相数
                var powerPhasesCell = $('<td><p>' +parameters['供电相数'] + '</p></td>');
                $('#powerPhasesRow').append(powerPhasesCell);

                // 散热规模
                var coolingScaleCell = $('<td><p>' +parameters['散热规模'] + '</p></td>');
                $('#coolingScaleRow').append(coolingScaleCell);

                // 是否有均热板
                var heatSpreadersCell = $('<td><p>' +parameters['是否有均热板'] + '</p></td>');
                $('#heatSpreadersRow').append(heatSpreadersCell);

                // 供电接口
                var powerInterfaceCell = $('<td><p>' +parameters['供电接口'] + '</p></td>');
                $('#powerInterfaceRow').append(powerInterfaceCell);

                // 插槽
                var slotCell = $('<td><p>' +parameters['插槽'] + '</p></td>');
                $('#slotRow').append(slotCell);

                // 输出接口
                var outputInterfaceCell = $('<td><p>' +(parameters['输出接口'] + '</p></td>'));
                $('#outputInterfaceRow').append(outputInterfaceCell);

                // 配件
                var accessoriesCell = $('<td><p>' +(parameters['配件'] + '</p></td>'));
                $('#accessoriesRow').append(accessoriesCell);

                // 测评
                var reviewCell = $('<td>');
                if (parameters['review'][0].reviewURL) {
                    reviewCell.html('<a href="' + parameters['review'][0].reviewURL + '">测评链接</a>');
                } else {
                    reviewCell.text('暂无测评');
                }
                $('#reviewRow').append(reviewCell);

                // 其他
                var otherCell = $('<td><p>' +parameters['其他']);
                $('#otherRow').append(otherCell);

                // 生成 HTML 结构
                var html = '<div class="col-md-6 pricing-col aic-card">' +
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
                    '<li><p>' + (parameters.供电接口 || '') + '</p></li>' +
                    '<li><p>' + (parameters.插槽 || '') + '</p></li>' +
                    '<li class="output-port"><p>' + (parameters.输出接口 || '') + '</p></li>' +
                    '<li class="assets"><p>' + (parameters.配件 || '') + '</p></li>' +
                    '<li class="review"><a href="' + (parameters.review[0].reviewURL || '') + '" target="_blank" title="点我"><p>' + (parameters.review[0].tester || '') + '</p></a></li>' +
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