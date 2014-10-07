                function analyzeByGraphAJAX(todo)
                {
                        document.getElementById("loadgif").src="images/loading.gif";
                        if ( todo == 0 )
                        {
                                document.getElementById("content").innerHTML = "<div id=\"content1\"><fieldset><legend><b>Info</b></legend><table><th>Source</th><th>Date</th><th>Time</th><th>PIDs</th><th>Commands</th><tr><td></td><td></td><td></td><td><input id=\"pidFilter\" type=\"text\" style=\"margin-left:5px;\" onkeyup=\"filter(0,'both')\"></input></td><td><input id=\"commandFilter\" type=\"text\" style=\"margin-left:5px;width:540px;\" onkeyup=\"filter(1,'both')\"></td></tr><tr><td><select id=\"dbTableNameSelect\" size=\"10\" style=\"float:left;margin-left:5px;\" onchange=\"analyzeByGraphAJAX(1)\"></select></td><td><select id=\"dateSelect\" size=\"10\" style=\"float:left;margin-left:5px;\" onchange=\"analyzeByGraphAJAX(2)\"></select></td><td><select id=\"timeSelect\" size=\"10\" style=\"float:left;margin-left:5px;\" onchange=\"analyzeByGraphAJAX(3)\"></select></td><td><select id=\"pidSelect\" size=\"10\" style=\"float:left;margin-left:5px;width:156px;\" onchange=\"analyzeByGraphAJAX(4)\"></select></td><td><select id=\"commandSelect\" size=\"10\" style=\"float:left;width:550px;margin-left:5px;\" onchange=\"analyzeByGraphAJAX(5)\"></select></td></tr></table></fieldset></div><div id=\"content2\"></div>";
                                document.getElementById("dbTableNameSelect").multiple = false;
                                document.getElementById("dateSelect").multiple = true;
                                document.getElementById("timeSelect").multiple = true;
                                document.getElementById("pidSelect").multiple = true;
                                document.getElementById("commandSelect").multiple = true;
                                document.getElementById("pidFilter").disabled = true;
                                document.getElementById("commandFilter").disabled = true;
                                document.getElementById("content2").innerHTML = "<fieldset style=\"float:left\"><legend>Plot for Process</legend><table><tr><td><input id=\"virCheckbox\" type=\"checkbox\" name=\"virt\" value=\"NO\">Virtual Memory</input></td></tr><tr><td><input id=\"resCheckbox\" type=\"checkbox\" name=\"res\" value=\"NO\">Resident Memory</input></td></tr><tr><td><input id=\"shrCheckbox\" type=\"checkbox\" name=\"shr\" value=\"NO\">Shared Memory</input></td></tr><tr><td><input id=\"percCpuCheckbox\" type=\"checkbox\" name=\"perccpu\" value=\"NO\">Percentage CPU</input></td></tr><tr><td><input id=\"percMemCheckbox\" type=\"checkbox\" name=\"percmem\" value=\"NO\">Percentage Memory</input></td></tr></table></fieldset><fieldset style=\"float:left\"><legend>Plot for System</legend><table><tr><td><input id=\"sysMemCheckbox\" type=\"checkbox\" name=\"sysmem\" value=\"NO\">System Memory</input></td></tr><tr><td><input id=\"sysSwapCheckbox\" type=\"checkbox\" name=\"sysswap\" value=\"NO\">System Swap</input></td></tr><tr><td><input id=\"sysBufferCheckbox\" type=\"checkbox\" name=\"sysbuffer\" value=\"NO\">System Buffer</input></td></tr><tr><td><input id=\"sysCacheCheckbox\" type=\"checkbox\" name=\"syscache\" value=\"NO\">System Cache</input></td></tr><tr><td><input id=\"sysProcessCheckbox\" type=\"checkbox\" name=\"sysProcess\" value=\"NO\">Total Processes</input></td></tr></table></fieldset><fieldset style=\"float:left\"><legend>Copy Pad</legend><textarea id=\"copypad\" type=\"text\" style=\"height:115px;\"></textarea></fieldset><form id=\"generateGraphForm\" action=\"scripts/php/analyzeByGraphNew.php\" method=\"get\" target=\"resultFrame\"><input id=\"tableFilterInForm\" type=\"hidden\" name=\"tablefilterinform\" value=\"NO\"></input><input id=\"dateFilterInForm\" type=\"hidden\" name=\"datefilterinform\" value=\"NO\"></input><input id=\"timeFilterInForm\" type=\"hidden\" name=\"timefilterinform\" value=\"NO\"></input><input id=\"pidFilterInForm\" type=\"hidden\" name=\"pidfilterinform\"></input><input id=\"graphs\" type=\"hidden\" name=\"graphs\"></input><input id=\"submitInForm\" type=\"submit\" value=\"Submit\" onclick=\"analyzeByGraphAJAXSubmitForm()\"></form>";
                        document.getElementById("submitInForm").disabled=true;
                        }
                        var xmlhttp,response;
                        if (window.XMLHttpRequest)
                        {// code for IE7+, Firefox, Chrome, Opera, Safari
                                xmlhttp=new XMLHttpRequest();
                        }
                        else
                        {// code for IE6, IE5
                                xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
                        }
                        xmlhttp.onreadystatechange=function()
                        {
                                if (xmlhttp.readyState==4 && xmlhttp.status==200)
                                {
                                        response = xmlhttp.responseText;
                                        var arr = response.split(",");
                                        var arr_length = arr.length;
                                        var dbTableNameSelect = document.getElementById("dbTableNameSelect");
                                        var dateSelect = document.getElementById("dateSelect");
                                        var timeSelect = document.getElementById("timeSelect");
                                        var pidSelect = document.getElementById("pidSelect");
                                        var commandSelect = document.getElementById("commandSelect");
                                        for (i=1;i<arr_length;i++)
                                        {
                                                var option = document.createElement("option");
                                                option.text=arr[i];
                                                option.value=arr[i];
                                                if (arr[0] == "table")
                                                {
                                                        dbTableNameSelect.add(option);
                                                }
                                                else if (arr[0] == "date")
                                                {
                                                        dateSelect.add(option);
                                                }
                                                else if (arr[0] == "time")
                                                {
                                                        timeSelect.add(option);
                                                }
                                                else if (arr[0] == "pid")
                                                {
                                                        pidSelect.add(option);
                                                        document.getElementById("submitInForm").disabled=false;
                                                }
                                                else if (arr[0] == "command")
                                                {
                                                        commandSelect.add(option);
                                                }
                                        }
                                }
                        }
                        if (todo == 0)
                        {
                                var sendCommand = "scripts/php/analyzeByGraphAJAX.php?fetch=tableName&table=NODATA&date=NODATA&time=NODATA&pid=NODATA&command=NODATA";
                                xmlhttp.open("GET",sendCommand,true);
                                xmlhttp.send();
                        }
                        else if (todo == 1)
                        {
                                document.getElementById("dateSelect").innerHTML = "";
                                document.getElementById("timeSelect").innerHTML = "";
                                document.getElementById("pidSelect").innerHTML = "";
                                document.getElementById("commandSelect").innerHTML = "";
                                document.getElementById("pidFilter").value="";
                                document.getElementById("pidFilter").disabled=true;
                                document.getElementById("commandFilter").value="";
                                document.getElementById("commandFilter").disabled=true;
                                document.getElementById("submitInForm").disabled=true;
                                var selectedTable = document.getElementById("dbTableNameSelect").value;
                                var sendCommand = "scripts/php/analyzeByGraphAJAX.php?fetch=date&table=" + selectedTable + "&date=NODATA&time=NODATA&pid=NODATA&command=NODATA";
                                xmlhttp.open("GET",sendCommand,true);
                                xmlhttp.send();
                        }
                        else if (todo == 2)
                        {
                                document.getElementById("timeSelect").innerHTML = "";
                                document.getElementById("pidSelect").innerHTML = "";
                                document.getElementById("commandSelect").innerHTML = "";
                                var selectedTable = document.getElementById("dbTableNameSelect").value;
                                var selectedDateObj = document.getElementById("dateSelect");
                                var selectedDate = "";
                                var index=0;
                                for (var j=0;j<selectedDateObj.length;j++)
                                {
                                        if (selectedDateObj.options[j].selected)
                                        {
                                                if (index == 0)
                                                {
                                                        selectedDate = "'" + selectedDateObj.options[j].value + "'";
                                                        index=1;
                                                }
                                                else
                                                {
                                                        selectedDate = selectedDate + ",'" + selectedDateObj.options[j].value + "'";
                                                }
                                        }
                                }
                                var sendCommand = "scripts/php/analyzeByGraphAJAX.php?fetch=time&table=" + selectedTable + "&date=" + selectedDate +"&time=NODATA&pid=NODATA&command=NODATA";
                                xmlhttp.open("GET",sendCommand,true);
                                xmlhttp.send();
                        }
                        else if (todo == 3)
                        {
                                document.getElementById("pidSelect").innerHTML = "";
                                document.getElementById("commandSelect").innerHTML = "";
				document.getElementById("pidFilter").value="";
				document.getElementById("commandFilter").value="";
                                var selectedTable = document.getElementById("dbTableNameSelect").value;
                                var selectedDateObj = document.getElementById("dateSelect");
                                var selectedDate = "";
                                var index=0;
                                for (var j=0;j<selectedDateObj.length;j++)
                                {
                                        if (selectedDateObj.options[j].selected)
                                        {
                                                if (index == 0)
                                                {
                                                        selectedDate = "'" + selectedDateObj.options[j].value + "'";
                                                        index=1;
                                                }
                                                else
                                                {
                                                        selectedDate = selectedDate + ",'" + selectedDateObj.options[j].value + "'";
                                                }
                                        }
                                }
                                var selectedTimeObj = document.getElementById("timeSelect");
                                if (selectedTimeObj.options[0].selected)
                                {
                                        for (var j=1;j<selectedTimeObj.length;j++)
                                        {
                                                selectedTimeObj.options[j].selected=true;
                                        }
                                        selectedTimeObj.options[0].selected=false;
                                }
                                var selectedTime = "";
                                var index=0;
                                for (var j=0;j<selectedTimeObj.length;j++)
                                {
                                        if (selectedTimeObj.options[j].selected)
                                        {
                                                if (index == 0)
                                                {
                                                        selectedTime = "'" + selectedTimeObj.options[j].value + "'";
                                                        index=1;
                                                }
                                                else
                                                {
                                                        selectedTime = selectedTime + ",'" + selectedTimeObj.options[j].value + "'";
                                                }
                                        }
                                }
                                var sendCommand = "scripts/php/analyzeByGraphAJAX.php?fetch=pid&table=" + selectedTable + "&date=" + selectedDate +"&time=" + selectedTime + "&pid=NODATA&command=NODATA";
                                xmlhttp.open("GET",sendCommand,false);
                                xmlhttp.send();
                                var sendCommand = "scripts/php/analyzeByGraphAJAX.php?fetch=command&table=" + selectedTable + "&date=" + selectedDate +"&time=" + selectedTime + "&pid=NODATA&command=NODATA";
                                xmlhttp.open("GET",sendCommand,false);
                                xmlhttp.send();
                                document.getElementById("pidFilter").disabled = false;
                                document.getElementById("commandFilter").disabled = false;
                        }
                        else if (todo == 4)
                        {
                                //document.getElementById("pidFilter").value="";
                                //document.getElementById("commandFilter").value="";
                                var selectedPidObj = document.getElementById("pidSelect");
                                for (var j=0;j<selectedPidObj.length;j++)
                                {
                                        if (selectedPidObj.options[j].selected)
                                        {
                                                if (document.getElementById("pidFilter").value == "")
                                                {
                                                        document.getElementById("pidFilter").value=selectedPidObj.options[j].value;
                                                }
                                                else
                                                {
                                                        var saveValue = document.getElementById("pidFilter").value;
                                                        document.getElementById("pidFilter").value=saveValue + "," + selectedPidObj.options[j].value;
                                                }
                                        }
                                }
				filter(0,"command");
                        }
                        else if (todo == 5)
                        {
                                //document.getElementById("pidFilter").value="";
                                document.getElementById("commandFilter").value="";
                                var selectedCommandObj = document.getElementById("commandSelect");
                                for (var j=0;j<selectedCommandObj.length;j++)
                                {
                                        if (selectedCommandObj.options[j].selected)
                                        {
                                                if (document.getElementById("commandFilter").value == "")
                                                {
                                                        document.getElementById("commandFilter").value=selectedCommandObj.options[j].value;
                                                }
                                                else
                                                {
                                                        var saveValue = document.getElementById("commandFilter").value;
                                                        document.getElementById("commandFilter").value=saveValue + "," + selectedCommandObj.options[j].value;
                                                }
                                        }
                                }
				filter(1,"both");
                        }
                        document.getElementById("loadgif").src="";
                }
