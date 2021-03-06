package com.lawer.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 页面跳转
 * @author 张涛
 * date: 2020.3.31 17:33:24
 */
@Controller
@RequestMapping("page")
public class PageController {
    //跳转到案件登记页面
    @RequestMapping("addcase")
    public String Login(){
        return "html/addcase";
    }

    //跳转到全部案件页面
    @RequestMapping("allcase")
    public String toAllCase(){
        return "html/allcase";
    }

    //跳转到未完成案件页面
    @RequestMapping("unfinishcase")
    public String toUnfinishCase(){
        return "html/unfinishcase";
    }

    //跳转到已完成案件页面
    @RequestMapping("finishcase")
    public String tofinishCase(){
        return "html/finishcase";
    }

    //跳转到个人信息页面
    @RequestMapping("peopleinfo")
    public String toPeopleInfo(){
        return "html/peopleinfo";
    }

    //跳转到员工信息页面
    @RequestMapping("allpeople")
    public String toAllPeople(){
        return "html/allpeople";
    }

    //跳转到添加员工页面
    @RequestMapping("addpeople")
    public String toAddPeople(){
        return "html/addpeople";
    }

    //跳转到登录日志页面
    @RequestMapping("loginrecord")
    public String toLoginRecord(){
        return "html/loginrecord";
    }

    //跳转到操作日志页面
    @RequestMapping("operaterecord")
    public String toOperateRecord(){
        return "html/operaterecord";
    }

    //跳转到修改密码页面
    @RequestMapping("modifyPassword")
    public String toModifyPassword(){
        return "html/modify_password";
    }

}
