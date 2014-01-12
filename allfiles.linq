<Query Kind="Program" />

void Main()
{			
	string[] files = 	Directory.GetFiles(@"C:\dev\iod3_LogicalError_glsl_es2\neo\demo", "*",
		    SearchOption.AllDirectories);
	foreach (string file in files)
	{
	    Console.WriteLine("\"" + file.Replace(@"C:\dev\iod3_LogicalError_glsl_es2\neo\demo\", "").Replace(@"\", @"\\") + "\",");
	}
}

