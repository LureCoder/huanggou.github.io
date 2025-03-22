$(document).ready(function () {

    // 示例数据，每个数据项包含名称、值和颜色
    // var data = [
    //     { name: '项目A', value: 4230, color: '#5793f3' },
    //     { name: '项目B', value: 70, color: '#d14a61' },
    //     { name: '项目C', value: 50, color: '#675bba' },
    //     { name: '项目D', value: 90, color: '#ff9f7f' },
    //     { name: '项目E', value: 10, color: '#7eb0d5' }
    // ];

    $.getJSON("./benchmark.json", function (json) {
        runBenchmark(json);
    });

   
});

function runBenchmark(data) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('chart-container'));

    

    // 对数据从大到小排序
    data.sort((a, b) => a.value - b.value);

    // 提取名称和值
    var names = data.map(item => item.name);
    var values = data.map(item => item.value);

    // 指定图表的配置项和数据
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: names
        },
        series: [{
            data: values.map((value, index) => ({
                value: value,
                itemStyle: {
                    color: data[index].color
                }
            })),
            type: 'bar'
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}