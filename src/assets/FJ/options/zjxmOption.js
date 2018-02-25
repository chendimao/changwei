/**
 * Created by Moye on 2017-12-11.
 */
var zjxmOption = {
		backgroundColor: '#f5f6fa',
    title:{
        text:'工程类型',
        subtext:'单位:个'
    },
    tooltip: {
        trigger: 'item',
        formatter: function(params) {
            return params.name+':'+params.value+'个';
        }
    },
    series: [
        {
            name:'工程属性',
            type:'pie',
            selectedMode: 'single',
            radius: [0, '30%'],
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
                    show: false,
                    position: 'inner'
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:gcsxData

        },
        {
            name:'类型分布',
            type:'pie',
            radius: ['45%', '75%'],
            itemStyle: {
                normal: {
                    color: function(params) {
                        var colorList =['#457B96', '#5C8C5C','#990000'];//var colorList =['#457B96', '#195C7D','#023650'];
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
            data:lxxxData
        }
    ]
};