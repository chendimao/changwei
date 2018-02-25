export class ZdkglModel {
    mc: string;//字典项名称. 在此单表数据字典中可能是数据类别、数据子类别或数据项的名称	是
    xh: string;//序号
    qc: string;//全称	否
    dm: string;//字典项代码	是
    lx: string;//字典项类别，如数据项或虚节点，1表示虚节点，0表示数据项	否
    zdlb: string;//字典类别:基本字典,指标类，项目类，档案类	是
    sjlb: string;//所属的第一级字典的代码	是
    pxh: string;//排序号	否
    sjId: string;//上级字典的id	否
}
