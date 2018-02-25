<?php
//每天发送统计数据
require("init.php");
error_reporting(0);

//    header("Content-type:text/json;charset=utf8");


$time = date('Y-m-d');
$time1 = date('Ymd');


//获取当天退款的次数
$sql = "SELECT * FROM refund WHERE time LIKE '%$time%'";
$res = mysqli_query($conn, $sql);
while ($row = mysqli_fetch_assoc($res)){
    $refund[]=$row;
};
$table .="<table border='2' bordercolor='black' width='100%' cellspacing='0' cellpadding='5'>
    <thead>
    <tr>
        <td colspan='6' align='center'>".$time."退款统计</td>
</tr>
    </thead>
    <tr>
        <td>api名称</td>
        <td>退款金额</td>
        <td>交易id</td>
        <td>退款时间</td>
        <td>支付方式</td>
</tr>";
foreach ($refund as $key => $value){
    $table .="<tr>";
    $table .="<td>".$value['temp']."</td>";
    $table .="<td>".$value['price']."</td>";
    $table .="<td>".$value['payId']."</td>";
    $table .="<td>".$value['time']."</td>";
    $table .="<td>".$value['payway']."</td>";
    $table .="</tr>";
};
$table .="</table>";
//获取所有商品信息
$sql = "SELECT * FROM productlist";
$res = mysqli_query($conn, $sql);
while ($row = mysqli_fetch_array($res)) {
    $allList[] = $row;
};
foreach ($allList as $key => $value) {
    $tablename = $value['tablename'];
    $sql = "SELECT temp FROM $tablename WHERE time='$time'";
    $res = mysqli_query($conn, $sql);
    $result[$tablename][] = "";
    while ($row = mysqli_fetch_array($res)) {
        $result[$tablename][] = $row;
    };
}
foreach ($allList as $key => $value) {
    $allPrice += (count($result[$value['tablename']]) - 1) * $value['price'];
    $allCount += count($result[$value['tablename']]) - 1;
    $allCost += (count($result[$value['tablename']]) - 1) * $value['cost'];
}
$allProfit=$allPrice - $allCost;
//    记录每天的支付方式
$sql = "SELECT * FROM alipay WHERE time='$time'";
$res = mysqli_query($conn, $sql);
while ($row = mysqli_fetch_array($res)) {
    $aliPay[] = $row;
};
foreach ($aliPay as $key => $value) {
    switch ($value['payWay']) {
        case "手机支付宝支付":
            $aliPayWayCount['alimoblie'][] = "alimoblie";
            break;
        case "支付宝扫码支付":
            $aliPayWayCount['aliPc'][] = "aliPc";
            break;
    }
}
$sql = "SELECT * FROM wxpay WHERE time= '$time'";
$res = mysqli_query($conn, $sql);
while ($row = mysqli_fetch_array($res)) {
    $wxPay[] = $row;
};
foreach ($wxPay as $key => $value) {
    switch ($value['payWay']) {
        case "手机微信支付":
            $wxPayWayCount['alimoblie'][] = "alimoblie";
            break;
        case "微信扫码支付":
            $wxPayWayCount['aliPc'][] = "aliPc";
            break;
        case "公众号支付":
            $wxPayWayCount['public'][] = "public";
            break;
    }
}
$allPayCount = count($aliPayWayCount['alimoblie']) + count($aliPayWayCount['aliPc']) + count($wxPayWayCount['alimoblie']) + count($wxPayWayCount['aliPc']) + count($wxPayWayCount['public']);
//记录付款成功的支付方式
foreach ($allList as $key => $value) {
    $tablename=$value['tablename'];
    $sql = "SELECT payId FROM $tablename WHERE time='$time'";
    $res = mysqli_query($conn, $sql);
    while ($row = mysqli_fetch_assoc($res)) {
        $payId[$tablename][]= $row;
    };
};

$pay=['alipay','wxpay'];
foreach ($payId as $key => $value){
    foreach ($value as $key => $payId){
        foreach ($pay as $key => $value){
            $sql="select payWay from $value WHERE payId='$payId[payId]'";
            $res = mysqli_query($conn, $sql);
            while ($row = mysqli_fetch_assoc($res)) {
                switch ($row['payWay']) {
                    case "手机微信支付":
                        $payWayCount['wxmoblie'][] = "wxmoblie";
                        break;
                    case "微信扫码支付":
                        $payWayCount['wxPc'][] = "wxPc";
                        break;
                    case "公众号支付":
                        $payWayCount['public'][] = "public";
                        break;
                    case "手机支付宝支付":
                        $payWayCount['alimoblie'][] = "alimoblie";
                        break;
                    case "支付宝扫码支付":
                        $payWayCount['aliPc'][] = "aliPc";
                        break;
                }
            };
        }
    }
}
//var_dump($payWayCount);
$payWayAllCount= count($payWayCount['wxmoblie']) + count($payWayCount['wxPc']) + count($payWayCount['public']) + count($payWayCount['alimoblie']) + count($payWayCount['aliPc']);

$html = "";
$html .="<table border='2' bordercolor='black' width='100%' cellspacing='0' cellpadding='5'>
    <thead>
    <tr>
        <td colspan=\"6\" align=\"center\">". $time ."api调用记录表</td>
    </tr>
    </thead>
    <tr>
        <td>api名称：</td>
        <td>次数</td>
        <td>单价</td>
        <td>收入</td>
        <td>成本</td>
        <td>利润</td>
    </tr>";

foreach ($allList as $key => $value) {
    $html .="<tr>";
    $html .="<td>". $value['classname'] ."使用次数</td>";
    $html .="<td>". (count($result[$value['tablename']])-1)."</td>";
    $html .="<td>". $value['price'] ."元/次</td>";
    $html .="<td>".(count($result[$value['tablename']]) - 1) * $value['price'] ."</td>";
    $html .="<td>". (count($result[$value['tablename']]) - 1) * $value['cost'] ."</td>";
    $html .="<td>".(count($result[$value['tablename']])-1)*($value['price']-$value['cost']) ."元</td>";
    $html .="</tr>";
};
$html .="<tr>";
$html .="<td>总收入</td>";
$html .="<td>". $allCount ."</td>";
$html .="<td>&nbsp;&nbsp;</td>";
$html .="<td style='text-align: center;'>". $allPrice ."元</td>";
$html .="<td>". $allCost ."元</td>";
$html .="<td>". $allProfit ."元</td>";
$html .="</tr>";
$html .="</table>";
$html .="
<table border='2' bordercolor='black' width='100%' cellspacing='0' cellpadding='5' style='margin-top: 30px;'>
    <thead>
    <tr>
        <td colspan='6' align='center'>". $time ."支付方式统计</td>
    </tr>
    </thead>
    <tr>
        <td>支付方式</td>
        <td>总次数：</td>
        <td>实际成功次数：</td>

    </tr>
    <tr>
        <td>支付宝扫码支付</td>
        <td>".count($aliPayWayCount['aliPc'])."</td>
        <td>".count($payWayCount['aliPc'])."</td>

    </tr>
    <tr>
        <td>支付宝手机支付</td>
        <td>". count($aliPayWayCount['alimoblie']) ."</td>
        <td>". count($payWayCount['alimoblie']) ."</td>
    </tr>
    
    <tr>
        <td>微信扫码支付</td>
        <td>". count($wxPayWayCount['aliPc']) ."</td>
        <td>". count($payWayCount['wxPc']) ."</td>
    </tr>
    <tr>
        <td>微信手机支付</td>
        <td>". count($wxPayWayCount['alimoblie']) ."</td>
        <td>". count($payWayCount['wxmoblie']) ."</td>

    </tr>
    <tr>
        <td>公众号支付</td>
        <td>". count($wxPayWayCount['public']) ."</td>
        <td>". count($payWayCount['public']) ."</td>

    </tr>


    <tr>

        <td>总次数</td>
        <td>". $allPayCount ."</td>
        <td>". $payWayAllCount ."</td>

    </tr>
</table>";
$html .=$table;




//进行每天统计数据,时间，temp，收入
	$sql="insert into all_count VALUES(NULL,'$time','$gongshang_jd','$gongshang_xq','$fygg_jd','$fygg_xq','$qyycjy','$all_sr')";
	$res=mysqli_query($conn,$sql);
	
	
	
	date_default_timezone_set('Asia/Shanghai');
	require_once "email/Smtp.class.php";
	//******************** 配置信息 ********************************
	
	$smtpserver = "smtp.163.com";//SMTP服务器
	$smtpserverport =25;//SMTP服务器端口
	$smtpusermail = "houxiaoyi163com@163.com";//SMTP服务器的用户邮箱
	$smtpemailto ="849004406@qq.com,wuhanjingle@gmail.com,465926813@qq.com";//发送给谁
//    $smtpemailto ="849004406@qq.com";//发送给谁
	$smtpuser = "houxiaoyi163com@163.com";//SMTP服务器的用户帐号，注：部分邮箱只需@前面的用户名
	$smtppass = "wuhanjingjie2017";//SMTP服务器的用户密码
	$mailtitle ="api".$time."天统计信息";//邮件主题
	$mailcontent =$html;
    
    ;//邮件内容
	//echo $mailcontent;
	$mailtype = "HTML";//邮件格式（HTML/TXT）,TXT为文本邮件
	//************************ 配置信息 ****************************
	$smtp = new Smtp($smtpserver,$smtpserverport,true,$smtpuser,$smtppass);//这里面的一个true是表示使用身份验证,否则不使用身份验证.
	$smtp->debug = false;//是否显示发送的调试信息
	$state = $smtp->sendmail($smtpemailto, $smtpusermail, $mailtitle, $mailcontent, $mailtype);
?>
	
	


