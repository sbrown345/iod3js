<%@ Page Language="C#" AutoEventWireup="true" ValidateRequest="false" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Web.Script.Serialization" %>
<%
    // i guess this will be faster than the websockets code
    // todo...
    
    var logText = Request.Form["string"].Replace("\n", "\r\n"); // where are these picked up from in doom3_c.log?;

    var cLog = Path.Combine(Server.MapPath(@"~\"), @"..\neo\doom3_c.log");
    var jsLog = Server.MapPath("~/doom3_js.log");
    int logPosition = int.Parse(this.Request.Form["logPosition"]);
    bool writeLog = false;

    if (logPosition == 0)
    {
        if (writeLog)
        {
            File.WriteAllText(jsLog, logText);
        }
    }
    else
    {
        if (writeLog)
        {
            File.AppendAllText(jsLog, logText);
        }

        using (var originalLogReader = new StreamReader(cLog))
        {
            var buffer = new char[logText.Length*2];
            originalLogReader.BaseStream.Seek(logPosition, SeekOrigin.Begin);
            originalLogReader.Read(buffer, 0, logText.Length);
            string originalLogText = new string(buffer).Substring(0, logText.Length);
            if (logText != originalLogText)
            {
                //Clients.All.mismatch(originalLogText, logText, logPosition);
                Response.Write(new JavaScriptSerializer().Serialize(new
                {
                    originalLogText,
                    logText,
                }));
            }

            //logPosition += logText.Length; // track on JS side
        }
    }
%>