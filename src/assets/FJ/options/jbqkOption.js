/**
 * Created by Moye on 2017-12-11.
 */
var jbqkOption = {
    title:{
        text:'建设情况',
        subtext:'单位:个'
    },
    tooltip: {
        trigger: 'item'
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
            data:jbqkData
        }
    ]
};