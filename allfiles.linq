<Query Kind="Program" />

void Main()
{			
	var path = @"C:\dev\iod3_LogicalError_glsl_es2\neo\demo";
	string[] files = 	Directory.GetFiles(path, "*",
		    SearchOption.AllDirectories);
	foreach (string file in files)
	{
	    Console.WriteLine("{path: \"" + file.Replace(path, "").Replace(@"\", @"\\") + "\", size: " + new FileInfo(file).Length + "},");
	}
}