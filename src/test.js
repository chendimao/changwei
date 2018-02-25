var arr = [
    {
        "children": [
            {
                "children": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "children": null,
                                        "data": {
                                            "data": {
                                                "start": null,
                                                "limit": null,
                                                "orderCol": null,
                                                "zdxmc": "五",

                                            }
                                        }
                                    }
                                ],
                                "data": {
                                    "start": null,
                                    "limit": null,
                                    "orderCol": null,
                                    "zdxmc": "四",

                                }
                            }
                        ],
                        "data": {
                            "start": null,
                            "limit": null,
                            "orderCol": null,
                            "zdxmc": "三",

                        }
                    }
                ],
                "data": {
                    "start": null,
                    "limit": null,
                    "orderCol": null,
                    "zdxmc": "er",

                }
            }
        ],
        "data": {
            "start": null,
            "limit": null,
            "orderCol": null,
            "zdxmc": "一",

        }
    },
    {
        "children": [
            {
                "children": [
                    {
                        "children": [
                            {
                                "children": [
                                    {
                                        "children": null,
                                        "data": {
                                            "data": {
                                                "start": null,
                                                "limit": null,
                                                "orderCol": null,
                                                "zdxmc": "五",

                                            }
                                        }
                                    }
                                ],
                                "data": {
                                    "start": null,
                                    "limit": null,
                                    "orderCol": null,
                                    "zdxmc": "四",

                                }
                            }
                        ],
                        "data": {
                            "start": null,
                            "limit": null,
                            "orderCol": null,
                            "zdxmc": "三",

                        }
                    }
                ],
                "data": {
                    "start": null,
                    "limit": null,
                    "orderCol": null,
                    "zdxmc": "er",

                }
            }
        ],
        "data": {
            "start": null,
            "limit": null,
            "orderCol": null,
            "zdxmc": "二",

        }
    }
];
var resArr = [
    {
        "start": null,
        "limit": null,
        "orderCol": null,
        "zdxmc": "一",

        "children": [
            {
                "start": null,
                "limit": null,
                "orderCol": null,
                "zdxmc": "er",

                "children": [
                    {
                        "start": null,
                        "limit": null,
                        "orderCol": null,
                        "zdxmc": "三",

                        "children": [
                            {
                                "start": null,
                                "limit": null,
                                "orderCol": null,
                                "zdxmc": "四",

                                "children": [
                                    {
                                        "data": {
                                            "start": null,
                                            "limit": null,
                                            "orderCol": null,
                                            "zdxmc": "五",

                                        },
                                        "children": null
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "start": null,
        "limit": null,
        "orderCol": null,
        "zdxmc": "二",

        "children": [
            {
                "start": null,
                "limit": null,
                "orderCol": null,
                "zdxmc": "er",

                "children": [
                    {
                        "start": null,
                        "limit": null,
                        "orderCol": null,
                        "zdxmc": "三",

                        "children": [
                            {
                                "start": null,
                                "limit": null,
                                "orderCol": null,
                                "zdxmc": "四",

                                "children": [
                                    {
                                        "data": {
                                            "start": null,
                                            "limit": null,
                                            "orderCol": null,
                                            "zdxmc": "五",

                                        },
                                        "children": null
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
];
var b = [];

function returnArr(arr) {
    for (var i = 0; i < arr.length; i++) {
        console.log(arr[i]);
        console.log(arr[i].data);
        b[i] = arr[i].data;
        if (arr[i]) {

        }
        console.log(b)

    }
}

// console.log(returnArr(arr));

var data = 'string(152) "{"data":{"keyword":"武汉市劲捷电子信息有限公司","result":{"data":"914201037071229925"}},"resp":{"RespCode":"200","RespMsg":"查询成功"}}"';
var str1 = data.indexOf('{');
data = JSON.parse(data.slice(str1, -1));
console.log(data);


