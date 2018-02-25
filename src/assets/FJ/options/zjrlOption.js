/**
 * Created by Moye on 2017-12-11.
 */
var zjrlOption = {
    title:{
        text:'装机容量',
        subtext:'单位:万kw'
    },
    tooltip: {
        trigger: 'item'
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            //data : ['小（二）型\n水库','小（一）型\n水库','中型\n水库','大（二）型\n水库','大（一）型\n水库'],
            data: ['官昌','屏峰','枋洋','彭村','双溪','乌溪','兴头','桃源'],
            axisLabel:{
                interval:0,
                rotate:30
            }
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series: [
        {
            type:'bar',
            data:[5, 3, 1.2, 0.74, 0.6, 0.4, 0.08, 0.04],
            tooltip: {
                formatter:function (params) {
                    return params.name+'</br>'+params.data+'万千瓦';
                }
            },
            itemStyle:{
                normal:{
                    color:function () {
                        return "#457B96";
                        //return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6);
                    }
                }
            },
            barWidth:20
        }
    ]
};