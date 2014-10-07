                function analyzeByGraphAJAXSubmitForm()
                {
			document.getElementById("loadgif").src="images/loading.gif";
                        var selectedPid = document.getElementById("pidFilter").value;
                        if ( selectedPid == "" )
                        {
                                window.alert("No PIDs selected. Please select PIDs");
                        } 
                                var num = document.getElementById("dbTableNameSelect").selectedIndex;
                                document.getElementById("tableFilterInForm").value = document.getElementById("dbTableNameSelect").options[num].value;
                                document.getElementById("pidFilterInForm").value=selectedPid;
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
                                document.getElementById("dateFilterInForm").value=selectedDate;
                                var selectedTimeObj = document.getElementById("timeSelect");
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
                                document.getElementById("timeFilterInForm").value=selectedTime;
                                var plotCheck=0;
                                if (document.getElementById("virCheckbox").checked)
                                {
                                        plotCheck=1;
                                        if (document.getElementById("graphs").value == "")
                                        {
                                                document.getElementById("graphs").value = "virt";
                                        }
                                        else
                                        {
                                                document.getElementById("graphs").value = document.getElementById("graphs").value + ",virt";
                                        }
                                }
                                if (document.getElementById("resCheckbox").checked)
                                {
                                        plotCheck=1;
                                        if (document.getElementById("graphs").value == "")
                                        {
                                                document.getElementById("graphs").value = "res";
                                        }
                                        else
                                        {
                                                document.getElementById("graphs").value = document.getElementById("graphs").value + ",res";
                                        }
                                }
                                if (document.getElementById("shrCheckbox").checked)
                                {
                                        plotCheck=1;
                                        if (document.getElementById("graphs").value == "")
                                        {
                                                document.getElementById("graphs").value = "shr";
                                        }
                                        else
                                        {
                                                document.getElementById("graphs").value = document.getElementById("graphs").value + ",shr";
                                        }
                                }
                                if (document.getElementById("percCpuCheckbox").checked)
                                {
                                        plotCheck=1;
                                        if (document.getElementById("graphs").value == "")
                                        {
                                                document.getElementById("graphs").value = "cpuPerc";
                                        }
                                        else
                                        {
                                                document.getElementById("graphs").value = document.getElementById("graphs").value + ",cpuPerc";
                                        }
                                }
                                if (document.getElementById("percMemCheckbox").checked)
                                {
                                        plotCheck=1;
                                        if (document.getElementById("graphs").value == "")
                                        {
                                                document.getElementById("graphs").value = "memPerc";
                                        }
                                        else
                                        {
                                                document.getElementById("graphs").value = document.getElementById("graphs").value + ",memPerc";
                                        }
                                }
                                if (document.getElementById("sysMemCheckbox").checked)
                                {
                                        plotCheck=1;
                                        if (document.getElementById("graphs").value == "")
                                        {
                                                document.getElementById("graphs").value = "memUsed";
                                        }
                                        else
                                        {
                                                document.getElementById("graphs").value = document.getElementById("graphs").value + ",memUsed";
                                        }
                                }
                                if (document.getElementById("sysSwapCheckbox").checked)
                                {
                                        plotCheck=1;
                                        if (document.getElementById("graphs").value == "")
                                        {
                                                document.getElementById("graphs").value = "swapUsed";
                                        }
                                        else
                                        {
                                                document.getElementById("graphs").value = document.getElementById("graphs").value + ",swapUsed";
                                        }
                                }
                                if (document.getElementById("sysBufferCheckbox").checked)
                                {
                                        plotCheck=1;
                                        if (document.getElementById("graphs").value == "")
                                        {
                                                document.getElementById("graphs").value = "memBuffer";
                                        }
                                        else
                                        {
                                                document.getElementById("graphs").value = document.getElementById("graphs").value + ",memBuffer";
                                        }
                                }
                                if (document.getElementById("sysCacheCheckbox").checked)
                                {
                                        plotCheck=1;
                                        if (document.getElementById("graphs").value == "")
                                        {
                                                document.getElementById("graphs").value = "swapCached";
                                        }
                                        else
                                        {
                                                document.getElementById("graphs").value = document.getElementById("graphs").value + ",swapCached";
                                        }
                                }
                                if (document.getElementById("sysProcessCheckbox").checked)
                                {
                                        plotCheck=1;
                                        if (document.getElementById("graphs").value == "")
                                        {
                                                document.getElementById("graphs").value = "taskTotal";
                                        }
                                        else
                                        {
                                                document.getElementById("graphs").value = document.getElementById("graphs").value + ",taskTotal";
                                        }
                                }
                                if (plotCheck == 0)
                                {
                                        window.alert("No Graphs selected for plotting.");       
                                }
                                else
                                {
					document.getElementById("resultFrameID").src="result.html";
                                        document.getElementById("generateGraphForm").submit();
                                }
				document.getElementById("loadgif").src="";
                }       

