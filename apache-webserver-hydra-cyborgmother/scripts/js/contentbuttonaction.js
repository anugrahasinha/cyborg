function contentButtonAction(name)
{
	document.getElementById("loadgif").src="images/loading.gif";
        if (name == "contentButtonDistribute")
        {
//	       	document.getElementById("content").innerHTML = "<form action=\"scripts/demo.php\" method=\"get\" target=\"resultFrame\">First name: <input type=\"text\" name=\"fname\"><br>Last name: <input type=\"text\" name=\"lname\"><br><input type=\"submit\" value=\"Submit\"></form>";
	       	document.getElementById("content").innerHTML = "<p><b>Under Development</b></p><br><hr><form target=\"resultFrame\">Log file(unzipped top file): <input type=\"text\" name=\"filename\" disabled><br>Hostname <input type=\"hostname\" name=\"lname\" disabled><br>Username <input type=\"text\" name=\"username\" disabled><br>Password <input type=\"password\" name=\"password\" disabled><br><input type=\"submit\" value=\"Submit\" disabled></form>";
//	       	
        }
        if (name == "contentButtonAnalyze")
        {
        	document.getElementById("content").innerHTML = "<br><input type=\"checkbox\" id=\"contentAnalyzeByGraph\" onclick=\"analyzeBy()\"> Analyze by Graphs<br><input type=\"checkbox\" id=\"contentAnalyzeByQuery\" onclick=\"analyzeBy()\"> Analyze by Query";
        }
        document.getElementById("loadgif").src="";
}

