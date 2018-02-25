/**
 * Created by Moye on 2017-12-11.
 */
var yjxzsgltdOption = {
    title:{
        text:'永久性征收土地',
        subtext:'单位：亩'
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
            data:yjxzsgltdData
        }
    ]
};