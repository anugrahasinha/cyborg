                function filter(toFilter,toFilterSub)
                {
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
                                        var pidSelect = document.getElementById("pidSelect");
                                        var commandSelect = document.getElementById("commandSelect");
                                        for (i=1;i<arr_length;i++)
                                        {
                                                var option = document.createElement("option");
                                                option.text=arr[i];
                                                option.value=arr[i];
                                                if (arr[0] == "pid")
                                                {
                                                        pidSelect.add(option);
                                                }
                                                else if (arr[0] == "command")
                                                {
                                                        commandSelect.add(option);
                                                }
                                        }
                                }
                        }
                        if ( toFilter == 1 ) // Filter by command and get PID
                        {
                                document.getElementById("pidSelect").innerHTML = "";
                                document.getElementById("commandSelect").innerHTML = "";
                                //document.getElementById("pidFilter").value = "";
                                var filterValue = document.getElementById("commandFilter").value;
                                var filterArray = filterValue.split(",");
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
                                var selectedCommand = ""
                                for (var j=0;j<filterArray.length;j++)
                                {
                                        if (j == 0)
                                        {
                                                selectedCommand = filterArray[j];
                                        }
                                        else
                                        {
                                                selectedCommand = selectedCommand + "," + filterArray[j];
                                        }
                                }
				if (toFilterSub == "pid" || toFilterSub == "both")
				{
                                	var sendCommand = "scripts/php/analyzeByGraphAJAX.php?fetch=pid&table=" + selectedTable + "&date=" + selectedDate +"&time=" + selectedTime + "&pid=NODATA&command=" + selectedCommand + "&filter=YES";
                                	xmlhttp.open("GET",sendCommand,false);
                                	xmlhttp.send();
				}
				if (toFilterSub == "command" || toFilterSub == "both")
				{                         
                                	var sendCommand = "scripts/php/analyzeByGraphAJAX.php?fetch=command&table=" + selectedTable + "&date=" + selectedDate +"&time=" + selectedTime + "&pid=NODATA&command=" + selectedCommand + "&filter=YES";
                                	xmlhttp.open("GET",sendCommand,false);
                                	xmlhttp.send();
				}
                        }
                        else if ( toFilter == 0) // Filter by PID and get Command
                        {
                                //document.getElementById("pidSelect").innerHTML = "";
                                document.getElementById("commandSelect").innerHTML = "";
                                document.getElementById("commandFilter").value = "";
                                var filterValue = document.getElementById("pidFilter").value;
                                var filterArray = filterValue.split(",");

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
                                var selectedPid = ""
                                for (var j=0;j<filterArray.length;j++)
                                {
                                        if (j == 0)
                                        {
                                                selectedPid = "'" + filterArray[j] + "'";
                                        }
                                        else
                                        {
                                                selectedPid = selectedPid + ",'" + filterArray[j] + "'";
                                        }
                                }
                                if (toFilterSub == "pid" || toFilterSub == "both")
				{
					var sendCommand = "scripts/php/analyzeByGraphAJAX.php?fetch=pid&table=" + selectedTable + "&date=" + selectedDate +"&time=" + selectedTime + "&pid=" + selectedPid + "&command=NODATA&filter=YES";
                                	xmlhttp.open("GET",sendCommand,false);
                                	xmlhttp.send();                         
				}
				if (toFilterSub == "command" || toFilterSub == "both")
				{
                                	var sendCommand = "scripts/php/analyzeByGraphAJAX.php?fetch=command&table=" + selectedTable + "&date=" + selectedDate +"&time=" + selectedTime + "&pid=" + selectedPid + "&command=NODATA&filter=YES";
                                	xmlhttp.open("GET",sendCommand,false);
                                	xmlhttp.send();
				}
                        }       

                }

