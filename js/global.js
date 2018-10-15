var token = '';
var transfer_key = 'ead5de99e3dfe933ef56bd2ff6e08886';

// function getToken(callback,...args) {
//     $.ajax({
//         url:'http://qpg.vlusi.com/api/api.php',
//         type:'post',
//         dataType:'json',
//         data:{
//             act:'login',
//             phone:15952007883,
//             password:123456,
//             signature:SHA2('act=login&password=123456&phone=15952007883'+transfer_key)
//         },
//         async:false,
//         success:function (data) {
//             token = data.data.token;
//             callback(args);
//         },
//         error:function () {
//
//         }
//     });
// }

/**
 * 百度地图
 * 获取当前位置信息
 */
function getCurrentPosition(callback) {
    var geolocation = new BMap.Geolocation();
    var lat = '';
    var lng = '';
    var city = '';
    geolocation.getCurrentPosition(function(r) {
        if(this.getStatus() == BMAP_STATUS_SUCCESS) {
            //纬度
            lat = r.point.lat;
            //经度
            lng = r.point.lng;
            //城市名称
            city = r.address.city.substring(0,r.address.city.length - 1);
            callback({lat:lat,lng:lng,city:city});
        }
    });
}

/**
 * 处理URL参数
 */
function transformParams(callback) {
    var params = location.search.substring(1).split('&');
    var param = {};
    params.forEach(function(value,index,array) {
        var temp = value.split('=');
        param[temp[0]] = temp[1];
    });
    if(callback) {
        callback(param);
    }
    else {
        return param;
    }
}