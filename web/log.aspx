<%@ Page Language="C#" AutoEventWireup="true" ValidateRequest="false" %>
<%@ Import Namespace="System.IO" %>
<%
    var postedData = Request.Form["string"];

    var fileName = Server.MapPath("~/doom3_js.log");
    if (this.Request.Form["append"] != null)
    {
        File.AppendAllText(fileName, postedData);
    }
    else
    {
        File.WriteAllText(fileName, postedData);
    }
%>