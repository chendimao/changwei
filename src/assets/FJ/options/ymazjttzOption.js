/**
 * Created by Moye on 2017-12-11.
 */
var ymazjttzOption = {
    title:{
        text:'移民安置静态总投资',
        subtext:'单位:亿元'
    },
    tooltip: {
        trigger: 'item',
        // formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    series: [
        {
            id: 'pie',
            type:'pie',
            tooltip: {
                formatter: function(params) {
                    return params.name+':'+params.value+'个';
                }
            },
            avoidLabelOverlap: false,
            itemStyle: {
                normal: {
                    color: function(params) {
                        var colorList =['#457B96', '#5C8C5C','#990000'];
                        return colorList[params.dataIndex];
                    }
                }
            },
            label: {
                normal: {
                    // show: false
                    position:'inner'
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:ymazjttzData
        }
    ]
};