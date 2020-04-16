var vm = new Vue({
    el: "#app",
    data: {//页面所需数据
        caseId:"2",
        fileList:[],  //文件列表
        dialogFormVisible: false,  //弹出框可见性
        userList:[],   //用户列表,
        caseInfo:[],
        message:"测试用消息",
        userid:'bebede7a-4d27-4dfc-8fd7-35b8bc64f316'
    },

    //实例创建完成,进行步骤
    mounted: function () {
        this.$nextTick(function () {
            //保证this.$el已经插入文档
            //初始化方法
            this.cartView();

        })
    },
     filters: {  
     	status:function(num){
          	if(num==="0"){
               return "失败";
          	}else if(num==="1"){
               return "成功";
          	}      
     	}
	},
    methods: {
    	//w展示页面的方法
        cartView: function () {
            this.getUserAll();
            this.getFileAll();
            this.getCaseInfo();
        },
        //通用方法开始**************************************************
        getUserAll: function () {
            let temp = this;
            $.ajax({
                type:'POST', // 规定请求的类型（GET 或 POST）
                url:'/userCon/getAllLawer', // 请求的url地址
                dataType:'text', //预期的服务器响应的数据类型
                data:{   //规定要发送到服务器的数据
                    //'caseId':caseId
                },
                success: function(result){ // 当请求成功时运行的函数
                    //result返回的是string类型的数组
                    let da = JSON.parse(result);
                    temp.userList= da.data.data;

                },
                error:function(result){ //失败的函数
                    console.log("请求用户列表出错");
                }
            });
        },
        getCaseInfo: function () {
            let temp = this;
            $.ajax({
                type:'POST', // 规定请求的类型（GET 或 POST）
                url:'/case/getCaseInfo', // 请求的url地址
                dataType:'text', //预期的服务器响应的数据类型
                data:{   //规定要发送到服务器的数据
                    'caseId':temp.caseId,
                },
                success: function(result){ // 当请求成功时运行的函数
                    //result返回的是string类型的数组
                    let da = JSON.parse(result);
                    temp.caseInfo = da.data;
                },
                error:function(result){ //失败的函数
                    temp.$message({
                        message: '获取案件信息出错！！',
                        type: 'warning'
                    });
                }
            });
        },
        sendMessage: function () {
            let temp = this;
            temp.dialogFormVisible = false;
            let receiver = this.$refs.multipleTable.selection;   //获取表格中被选中的数据
            receiver = JSON.stringify(receiver);
            console.log(receiver);
            $.ajax({
                type:'POST', // 规定请求的类型（GET 或 POST）
                url:'/case/sendMessage', // 请求的url地址
                dataType:'text', //预期的服务器响应的数据类型
                data:{   //规定要发送到服务器的数据
                    'receiver':receiver,
                    'message':temp.message,
                    'sender':temp.userid
                },
                success: function(result){ // 当请求成功时运行的函数
                    //result返回的是string类型的数组
                    let da = JSON.parse(result);
                    temp.message = "";  //清空发送的消息
                    temp.$message({
                        message: '消息发送成功~~',
                        type: 'success'
                    });

                },
                error:function(result){ //失败的函数
                    temp.$message({
                        message: '消息发送失败！！',
                        type: 'warning'
                    });
                }
            });
        },
        //通用方法结束**************************************************


        //上传文件相关的钩子方法开始----------------------------------------
        beforeFileUpload:function (file) {
            //这里不返回true，是不能上传文件的
            return true;
        },
        FileUploadSuccess:function(result){
            this.$message({
                message: '文件上传成功！',
                type: 'success'
            });
            //刷新已上传文件列表
            this.getFileAll(this.caseId);
        },
        FileUploadError:function(result){
            this.$message({
                message: '文件上传失败，请检查是否符合文件要求',
                type: 'warning'
            });
        },
        //上传文件相关的钩子方法结束----------------------------------------

        //已上传文件处理相关的方法开始*************************
        getFileAll:function(caseId) {
            caseId = this.caseId;
            var aa = this;
            $.ajax({
                type:'POST', // 规定请求的类型（GET 或 POST）
                url:'/case/getFileAll', // 请求的url地址
                dataType:'text', //预期的服务器响应的数据类型
                data:{   //规定要发送到服务器的数据
                    'caseId':caseId
                },
                success: function(result){ // 当请求成功时运行的函数
                    //result返回的是string类型的数组
                   aa.fileList = JSON.parse(result);
                },
                error:function(result){ //失败的函数
                    console.log("请求文件列表出错")
                }
            });
        },
        watchFile:function (rowdata) {
            let temp = this;
            $.ajax({
                type:'POST', // 规定请求的类型（GET 或 POST）
                url:'/comm/WatchFile', // 请求的url地址
                dataType:'text', //预期的服务器响应的数据类型
                data:{   //规定要发送到服务器的数据
                    'filepath':rowdata.url,
                    'fileid':rowdata.fileid
                },
                success: function(result){ // 当请求成功时运行的函数
                    let  message = JSON.parse(result);
                    if("office"===message.data.type||"common"===message.data.type){
                        window.open(message.data.filePathHtml);
                        //window.open("/upload/11.html")
                    }else{
                        temp.$message({
                            type: 'warning',
                            message: "不支持的文件，请下载后浏览"
                        });
                    }
                },
                error:function(result){ //失败的函数
                    temp.$message({
                        type: 'warning',
                        message: "文件转换出错，请选择标准格式的word、excel文档"
                    });
                }
            });
        },
        deleteFileById:function (rowdata) {
            var temp = this;
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    type:'POST', // 规定请求的类型（GET 或 POST）
                    url:'/case/deleteFileById', // 请求的url地址
                    dataType:'text', //预期的服务器响应的数据类型
                    data:{   //规定要发送到服务器的数据
                        'fileid':rowdata.fileid,
                        'filepath':rowdata.url
                    },
                    success: function(result){ // 当请求成功时运行的函数
                        let message = JSON.parse(result)
                        //status返回值是number类型，===先比较类型再比较值，如果用字符串比较，就会有问题
                        if(message.status===200){
                            temp.$message({
                                type: 'success',
                                message: message.info
                            });
                            //刷新文件列表的数据
                            temp.getFileAll(temp.caseId);
                        }else{
                            temp.$message({
                                type: 'warning',
                                message: message.info
                            });
                        }

                    },
                    error:function(result){ //失败的函数
                        temp.$message({
                            type: 'warning',
                            message: '删除失败，服务器出现错误'
                        });
                    }
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        }
        //已上传文件处理相关的方法结束*************************
       
    }
});
