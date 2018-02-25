/**
 * Created by Moye on 2017-12-11.
 */
var skzkrOption = {
		backgroundColor: '#f5f6fa',
    title:{
        text:'水库总库容',
        subtext:'单位:万m3'
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
            data: ['枋洋','彭村','莲花','官昌','双溪','五星桥','乌溪','王家洲'],
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
            data:[12300, 7871, 3358, 2900, 2771, 2328, 2102, 2093],
            tooltip: {
                formatter:function (params) {
                    return params.name+'</br>'+params.data+'万立方米';
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