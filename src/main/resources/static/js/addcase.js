layui.use(['jquery','layer','form','layedit'],
    function () {
        var layer =layui.layer,$ =layui.jquery,form=layui.form,layedit=layui.layedit;
        //插入图片接口配置，要求接口返回的格式JSON如下
        /*{
          "code": 0 //0表示成功，其它失败
          ,"msg": "" //提示信息 //一般上传失败后返回
          ,"data": {
            "src": "图片路径"
            ,"title": "图片名称" //可选
          }
        }
        layedit.set({
            uploadImage: {
                url: '' //接口url
            }
        });*/
        var index = layedit.build('editor',{
            tool: [
                'strong' //加粗
                , 'italic' //斜体
                , 'underline' //下划线
                , 'del' //删除线
                , '|' //分割线
                , 'left' //左对齐
                , 'center' //居中对齐
                , 'right' //右对齐
                , '|' //分割线
            /*    , 'link' //超链接
                , 'unlink' //清除链接
                , 'face' //表情
                , 'image' //插入图片*/

            ]
        });
        //获取当前公司所有律师信息
        $.ajax({
            url: path + "/userCon/getAllLawer",
            type: "POST",
            success: function (data) {

                $.each(data.data.data, function (i, item) {
                    if(item.role_id != 4){
                        $("#mainp").append(
                            '<option value="' + item.Id
                            + '">' + item.name+'('+item.position+')'
                            + '</option>');
                    }
                });
                form.render();
            }
        });
        var s=1;
        //手机号是否合法
        $('#pnumber').blur(function() {
            if(!isMobileNumber($('#pnumber').val())){
                $('#rpwrp').removeAttr('hidden');
                $('#rprip').attr('hidden','hidden');

                s=0;
            }else {
                $('#rprip').removeAttr('hidden');
                $('#rpwrp').attr('hidden','hidden');
                s=1;
            };
        });
        //判断手机号是否合法
        function isMobileNumber(phone) {
            var flag = false;
            var message = "";
            var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
            if (phone == '') {
                // console.log("手机号码不能为空");
                message = "手机号码不能为空！";
            } else if (phone.length != 11) {
                //console.log("请输入11位手机号码！");
                message = "请输入11位手机号码！";
            } else if (!myreg.test(phone)) {
                //console.log("请输入有效的手机号码！");
                message = "请输入有效的手机号码！";
            } else {
                flag = true;
            }
            if (message != "") {
                // alert(message);
            }
            return flag;
        }

        form.on('submit(submitBut)',function (data) {

            data.field.content = layedit.getContent(index);
           if(s==0){
               layer.msg("请输入正确的手机号");
               return;
           }
            $.ajax({
                url:path+"/case/addCase",
                data:JSON.stringify(data.field),
                dataType:'json',
                type:'post',
                contentType: "application/json",
                success:function (data) {

                    if (data.status == 200){
                        layer.msg("添加成功");
                        setTimeout(function(){
                            location.href = path+"/page/addcase";
                            // menuCAClick("/page/unfinishcase",this)
                        },1000);

                    }else{
                        layer.msg('添加失败');
                    }
                }
            })

            return false;
        })




    }
)