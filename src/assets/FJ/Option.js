var effectScatterSeries= {
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
};



var baseInfoSeries={
    id: 'pie',
    type:'pie',
    center:["60%","20%"],
    radius: ['15%','20%'],
    tooltip: {
        formatter: function(params) {
            return params.name+':'+params.value+'个';
        }
    },
    avoidLabelOverlap: false,
    itemStyle: {
        normal: {
            color: function(params) {
                var colorList =['#ED5555', 'orange','#f4e925'];
                return colorList[params.dataIndex];
            }
        }
    },
    label: {
        normal: {
            formatter: ' {b|{b}：}{c}个  ',
            backgroundColor: '#535966',
            borderColor: '#aaa',
            borderWidth: 1,
            borderRadius: 4,
            rich: {
                b: {
                    fontSize: 16,
                    lineHeight: 33
                }
            }
        }
    },
    labelLine: {
        normal: {
            show: false
        }
    },
    data:baseInfo
};
var ZJSeries={
    type:'pie',
    center:["60%","70%"],
    radius: ['15%','20%'],
    tooltip: {
        formatter: function(params) {
            return params.name+':'+params.value+'个';
        }
    },
    avoidLabelOverlap: false,
    itemStyle: {
        normal: {
            color: function(params) {
                var colorList =['#ED5555', 'orange','#f4e925'];
                return colorList[params.dataIndex];
            }
        }
    },
    label: {
        normal: {
            formatter: ' {b|{b}：}{c}个  ',
            backgroundColor: '#535966',
            borderColor: '#aaa',
            borderWidth: 1,
            borderRadius: 4,
            rich: {
                b: {
                    fontSize: 16,
                    lineHeight: 33
                }
            }
        }
    },
    labelLine: {
        normal: {
            show: false
        }
    },
    data:ZJInfo
};
var YMSeries={
    type:'pie',
    center:["85%","50%"],
    radius: ['15%','20%'],
    tooltip: {
        formatter: function(params) {
            return params.name+':'+params.value+'个';
        }
    },
    avoidLabelOverlap: false,
    itemStyle: {
        normal: {
            color: function(params) {
                var colorList =['#ED5555', 'orange','#f4e925'];
                return colorList[params.dataIndex];
            }
        }
    },
    label: {
        normal: {
            formatter: ' {b|{b}：}{c}个  ',
            backgroundColor: '#535966',
            borderColor: '#aaa',
            borderWidth: 1,
            borderRadius: 4,
            rich: {
                b: {
                    fontSize: 16,
                    lineHeight: 33
                }
            }
        }
    },
    labelLine: {
        normal: {
            show: false
        }
    },
    data:YMInfo
};
var series=[effectScatterSeries,baseInfoSeries,ZJSeries,YMSeries];
var Option = {
    baseOption: {
        animationDurationUpdate: 1000,
        animationEasingUpdate: 'quinticInOut',
        backgroundColor: '#535966',
        /*title: [
            {
                text: '项目分布',
                left: '25%',
                top: '5%',
                textStyle: {
                    fontSize: 20,
                    color: 'rgba(255,255,255, 0.9)'
                }
            },{
                text: '建设情况',
                left: '57.5%',
                top: '18%',
                textStyle: {
                    fontSize: 20,
                    color: 'rgba(255,255,255, 0.9)'
                }
            },{
                text: '工程类型',
                left: '57.5%',
                top: '68%',
                textStyle: {
                    fontSize: 20,
                    color: 'rgba(255,255,255, 0.9)'
                }
            },{
                text: '移民人数',
                left: '82.5%',
                top: '48%',
                textStyle: {
                    fontSize: 20,
                    color: 'rgba(255,255,255, 0.9)'
                }
            }
        ],*/
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
                    areaColor: '#323c48',
                    borderColor: '#cccce5'//'#404a59'
                },
                emphasis: {
                    areaColor: '#323c48',
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
        // xAxis: {},
        // yAxis: {},
        series: series
    },
    options:[]
}