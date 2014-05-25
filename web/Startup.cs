using System.IO;
using System.Web;
using Microsoft.AspNet.SignalR;
using Owin;

namespace neots
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }

    public class Logging : Hub
    {
        private static int _originalLogPosition;

        public void Init()
        {
            File.WriteAllText(HttpContext.Current.Server.MapPath("~/doom3_js.log"), "");
            _originalLogPosition = 0;
        }

        // append to log, and compare current text to equivalent section of log from original
        public void Send(string logText)
        {
            logText = logText.Replace("\n", "\r\n"); // where are these picked up from in doom3_c.log?
            //File.AppendAllText(HttpContext.Current.Server.MapPath("~/doom3_js.log"), logText);
            using (
                var originalLogReader =
                    new StreamReader(Path.Combine(HttpContext.Current.Server.MapPath(@"~\"), @"..\neo\doom3_c.log"))
                )
            {
                var buffer = new char[logText.Length*2];
                originalLogReader.BaseStream.Seek(_originalLogPosition, SeekOrigin.Begin);
                originalLogReader.Read(buffer, 0, logText.Length);
                string originalLogText = new string(buffer).Substring(0, logText.Length);
                if (logText != originalLogText)
                {
                    Clients.All.mismatch(originalLogText, logText, _originalLogPosition);
                }

                _originalLogPosition += logText.Length;
            }
        }
    }
}