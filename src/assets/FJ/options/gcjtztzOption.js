/**
 * Created by Moye on 2017-12-11.
 */
var gcjtztzOption = {
		backgroundColor: '#f5f6fa',
    title:{
        text:'工程静态总投资',
        subtext:'单位:亿元'
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
            data : ['1亿\n及以下','1-2亿','2-5亿','5-10亿','10亿\n及以上'],
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
            data:[28, 7, 12,3,3],
            tooltip: {
                formatter:function (params) {
                    return params.name+':</br>'+params.data+'个';
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