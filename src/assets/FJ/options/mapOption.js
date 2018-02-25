/**
 * Created by Moye on 2017-12-11.
 */
var mapOption = {
    baseOption: {
        animationDurationUpdate: 1000,
        animationEasingUpdate: 'quinticInOut',
        //backgroundColor: '#d9dee4',
        //backgroundColor: '#f5f6fa',
        title: [
            {
                text: '福建省在建大中型水利水电工程项目分布',
                left: 'center',
                top: '2%',
                // textStyle: {
                //     fontSize: 20,
                //     // color: 'rgba(255,255,255, 0.9)'
                // }
            }
        ],
        geo: {
            map: '福建',
            left: '10%',
            // bottom: '10%',
            roam:true,
            silent: false,
            label: {
                normal: {
                    show: true
                },
                emphasis: {
                    show: false,
                    areaColor: '#eee'
                }
            },
            itemStyle: {
                normal: {
                    areaColor: '#0F618A',//'#323c48'
                    borderColor: '#cccce5'//'#404a59'
                },
                emphasis: {
                    areaColor: '#006666',
                    borderColor: '#cccce5'//'#404a59'
                }
            }
        },
        tooltip: {
            formatter: function(params) {
                // if ('value' in params.data) {
                //     return params.data.value[2] + ': ' + params.data.value[0]
                // }
            }
        },
        grid: {
            right: 10,
            left: '75%',
            top: '75%',
            bottom: 5
        },
        series: [
            {
                id: 'effectScatter',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data:mapData,
                symbolSize: 12,
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        color: function() {
                            return '#f4e925';
                        },
                        shadowBlur: 50,
                        shadowColor: '#EE0000'
                    }
                },
                tooltip: {
                    formatter: function(params) {
                        return '项目名称：'+params.name+'</br>属性：'+params.value[2]+'</br>涉及市县区：'+params.value[3]
                            +'</br>水库总库容（万m3）：'+params.value[4]+'</br>装机总量（万kw）：'+params.value[5]+'</br>工程静态总投资（亿元）：'+params.value[6]
                    }
                },
                zlevel: 1
            }
        ]
    },
    options:[]
}