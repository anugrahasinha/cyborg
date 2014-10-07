function menuOptions(option)
{
	document.getElementById("loadgif").src="images/loading.gif";
	if (option == "top")
        {
		document.getElementById("content").innerHTML = "<button id=\"contentButtonDistribute\" type=\"button\" onclick=\"contentButtonAction('contentButtonDistribute')\">Distribute</button><button id=\"contentButtonAnalyze\" type=\"button\" onclick=\"contentButtonAction('contentButtonAnalyze')\">Analyze</button>";
                document.getElementById("resultFrameID").src = "result.html";
        }
        else if (option == "io")
        {
        	document.getElementById("content").innerHTML = "<p>Actlog I/O Analysis Utility under development</p>";
                document.getElementById("resultFrameID").src = "result.html";
        }
        else if (option == "lsof")
        {
		document.getElementById("content").innerHTML = "<p>Actlog Lsof Analysis Utility under development</p>";
		document.getElementById("resultFrameID").src = "result.html";
	}
        document.getElementById("loadgif").src="";
}

