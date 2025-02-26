
$(document).ready(function () {
    // 加载 JSON 文件
    $.getJSON('nv.json', function (data) {
        // 遍历 products 数组
        $.each(data.products, function (index, product) {
            // 获取 parameters 中的节点值
            var parameters = product.parameters;
            var name = product.name;

            var levelCode = "";
            if((parameters.level)){
                if(parameters.level.value == 1){
                    levelCode = '<a href="" class="ribbon"><i class="fa fa-diamond"></i><span>'+parameters.level.name+'</span></a>';
                } else if (parameters.level.value == 2){
                    levelCode = '<a href="" class="ribbon"><i class="fa fa-star"></i><span>'+parameters.level.name+'</span></a>';
                }
                
            }

            // 生成 HTML 结构
            var html = '<div class="col-md-6 pricing-col person">' +
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
                '<li><p>' + (parameters.输出接口 || '') + '</p></li>' +
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

// 获取所有的 .tooltip-container 元素
const tooltipContainers = document.querySelectorAll('.tooltip-container');

// 遍历每个 .tooltip-container 元素
tooltipContainers.forEach((container) => {
    const pElement = container.querySelector('p');
    const tooltipElement = container.querySelector('.tooltip');

    // 将 p 元素的文本内容赋值给 tooltip 元素
    tooltipElement.textContent = pElement.textContent;
});