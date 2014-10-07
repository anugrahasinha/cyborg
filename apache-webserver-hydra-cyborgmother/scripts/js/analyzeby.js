function analyzeBy()
{
	document.getElementById("loadgif").src="images/loading.gif";
        var checkContentAnalyze = document.getElementById("contentAnalyzeByGraph").checked;
        if ( checkContentAnalyze == true )
        {
        	document.getElementById("contentAnalyzeByQuery").checked = false;
                document.getElementById("resultFrameID").src = "scripts/php/analyzeByQueryFirst.php";
                document.getElementById("content").innerHTML = "<br><form id=\"tempform\" action=\"scripts/php/analyzeByGraph.php\" method=\"get\" target=\"resultFrame\">Table: <input type=\"text\" name=\"table\" style=\"width:100px;\"><br>PID: <input type=\"text\" name=\"pid\" style=\"width:100px;\"><br><input type=\"submit\" value=\"Submit\"></form>";
                analyzeByGraphAJAX(0);
        }
        else
        {
		document.getElementById("contentAnalyzeByGraph").checked = false;
                document.getElementById("resultFrameID").src = "scripts/php/analyzeByQueryFirst.php";
                document.getElementById("content").innerHTML = "<br><form action=\"scripts/php/analyzeByQuery.php\" method=\"get\" target=\"resultFrame\">Query: <input type=\"text\" name=\"query\" style=\"width:1000px;\"><br><br><input type=\"submit\" value=\"Submit\"></form>";
        }
        document.getElementById("loadgif").src="";
}
