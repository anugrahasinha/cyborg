<html>

        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
        <script src="http://code.highcharts.com/highcharts.js"></script>
	<script src="http://code.highcharts.com/modules/exporting.js"></script>

<body>
	<?php
		$tab=$_GET["tablefilterinform"];
		$date=$_GET["datefilterinform"];
		$time=$_GET["timefilterinform"];
		$pid=$_GET["pidfilterinform"];
		$graphs=$_GET["graphs"];
		//$tab="asinha_TRB13463";
		//$pid="31583";
		$con=mysqli_connect("hydra-cyborgmother.nectechnologies.in","necbuilder","necbuilder@123","actlog_top");
		// Check connection
		if (mysqli_connect_errno())
		{
	        	echo "<p>Failed to connect to MySQL: " . mysqli_connect_error() . "</p><br>";
		}
		#else
		#{
		#       echo "<p>Connect to DB successful</p>";
		#}
		$indivPidTok=strtok($pid,",");
		$indivPidArray=array();
		while ($indivPidTok != false)
		{
			array_push($indivPidArray,$indivPidTok);
			$indivPidTok=strtok(",");
		}
		$numberOfIndivPid=count($indivPidArray);
		$indivGraphs=strtok($graphs,",");
		$i=1;
		$j=0;
		if ($numberOfIndivPid != 0)
		{
		while ($j != $numberOfIndivPid)
		{
			$indivPid=$indivPidArray[$j];
			echo "<p style=\"background-color:blue;color:white;\"> PID=$indivPid</p><br>";
			$indivGraphs=strtok($graphs,",");
			while ($indivGraphs != false)
			{
				if ($indivGraphs != "memUsed" and $indivGraphs != "swapUsed" and $indivGraphs != "memBuffer" and $indivGraphs != "swapCached" and $indivGraphs != "taskTotal")
				{
					$graphName="";
					if ($indivGraphs == "virt")
					{
						$graphName="Virtual Memory";
					}
					else if ($indivGraphs == "res")
					{
						$graphName="Resident Memory";
					}
                                        else if ($indivGraphs == "shr")
                                        {   
                                                $graphName="Shared Memory";
                                        }
                                        else if ($indivGraphs == "cpuPerc")
                                        {   
                                                $graphName="Percentage CPU";
                                        }   
                                        else if ($indivGraphs == "memPerc")
                                        {   
                                                $graphName="Percentage Memory";
                                        }   

					$divCreate="<div id=\"" . "div" . $i . "\" style=\"width:1240px;height:300px;\"></div><br>";
					echo $divCreate;
					$commandNameQuery="SELECT command FROM " . $tab . " WHERE pid=" . $indivPid;
					$commandNameQueryResult = mysqli_query($con,$commandNameQuery);
					$row=mysqli_fetch_array($commandNameQueryResult);
					$queryCommandName=$row['command'];
//					$query="SELECT timelog,pid,cpuPerc,memPerc,timeUsed,memUsed,command,virt FROM " . $tab . " WHERE pid=" . $indivPid . " ORDER BY timelog";
					$query="SELECT timelog,datelog,pid," . $indivGraphs . " FROM " . $tab . " WHERE pid=" . $indivPid . " AND datelog IN (" . $date . ") AND timelog IN (" . $time . ") ORDER BY timelog";
					$queryresult = mysqli_query($con,$query);
					echo "<script>";
					echo "$(function () {";
					$div="$('#div" . $i . "').highcharts({";
					echo $div;
					echo "chart: {";
					echo "type: 'line',";
					echo "zoomType: 'x',";
					echo "panning: true,";
					echo "panKey: 'shift'";
					echo "},";
					echo "credits: {";
					echo "enabled: false";
					echo "},";
					echo "title: {";
					echo "text: '" . $queryCommandName . "- PID:" . $indivPid . "'";
					echo "},";
					echo "xAxis: {";
					$categories="categories: [";
					$data="data: [";
					$index=0;
					while($row = mysqli_fetch_array($queryresult))
					{
						if ($index == "0")
						{
							$categories=$categories . "'" . $row['timelog'] . "'";
							$data=$data . $row[3];
						}
						else
						{
							$categories=$categories . ", '" . $row['timelog'] . "'";
							$data=$data . ", " . $row[3];
						}
						$index=$index+1;
					}
					$categories = $categories . "]";
					$data = $data . "]";
					//echo "categories: ['Apples', 'Bananas', 'Oranges']";
					echo "$categories";
					echo "},";
					echo "yAxis: {";
					echo "title: {";
			                echo "text: '$graphName'";
					echo "}";
					echo "},";
					echo "series: [{";
					echo "name: '$graphName',";
					echo "$data";
					echo "}]";
					echo "});";
					echo "});";
					echo "</script>";
					$i=$i+1;
				}
				$indivGraphs=strtok(",");
			}	
			$j=$j+1;
		}
		}
// Plotting System Graphs
		$indivGraphs=strtok($graphs,",");
		while ($indivGraphs != false)
		{
			if ($indivGraphs == "memUsed" or $indivGraphs == "swapUsed" or $indivGraphs == "memBuffer" or $indivGraphs == "swapCached" or $indivGraphs == "taskTotal")
			{
				$divCreate="<div id=\"" . "div" . $i . "\" style=\"width:1240px;height:300px;\"></div><br>";
				echo $divCreate;
//				$commandNameQuery="SELECT command FROM " . $tab . " WHERE pid=" . $indivPid;
//				$commandNameQueryResult = mysqli_query($con,$commandNameQuery);
//				$row=mysqli_fetch_array($commandNameQueryResult);
//				$queryCommandName=$row['command'];
//				$query="SELECT timelog,pid,cpuPerc,memPerc,timeUsed,memUsed,command,virt FROM " . $tab . " WHERE pid=" . $indivPid . " ORDER BY timelog";
                                $graphName="";
                                if ($indivGraphs == "memUsed")
                                {
	                                $graphName="System Memory(RAM) Used";
                                }
                                else if ($indivGraphs == "swapUsed")
                                {
                                        $graphName="System Swap Used";
                                }
                                else if ($indivGraphs == "memBuffer")
                                {
                                        $graphName="System Buffer Used";
                                }
                                else if ($indivGraphs == "swapCached")
                                {
                                        $graphName="System Cache Used";
                                }
                                else if ($indivGraphs == "taskTotal")
                                {
                                        $graphName="System Processes";
                                }

				$query="SELECT DISTINCT timelog,datelog," . $indivGraphs . " FROM " . $tab . " WHERE datelog IN (" . $date . ") AND timelog IN (" . $time . ") ORDER BY timelog";
				$queryresult = mysqli_query($con,$query);
				echo "<script>";
				echo "$(function () {";
				$div="$('#div" . $i . "').highcharts({";
				echo $div;
				echo "chart: {";
				echo "type: 'line',";
				echo "zoomType: 'x',";
				echo "panning: true,";
				echo "panKey: 'shift'";
				echo "},";
                                echo "credits: {";
                                echo "enabled: false";
                                echo "},";
				echo "title: {";
				echo "text: '$graphName'";
				echo "},";
				echo "xAxis: {";
				$categories="categories: [";
				$data="data: [";
				$index=0;
				while($row = mysqli_fetch_array($queryresult))
				{
					if ($index == "0")
					{
						$categories=$categories . "'" . $row['timelog'] . "'";
						$data=$data . $row[2];
					}
					else
					{
						$categories=$categories . ", '" . $row['timelog'] . "'";
						$data=$data . ", " . $row[2];
					}
					$index=$index+1;
				}
				$categories = $categories . "]";
				$data = $data . "]";
				//echo "categories: ['Apples', 'Bananas', 'Oranges']";
				echo "$categories";
				echo "},";
				echo "yAxis: {";
				echo "title: {";
		                echo "text: '$graphName'";
				echo "}";
				echo "},";
				echo "series: [{";
				echo "name: '$graphName',";
				echo "$data";
				echo "}]";
				echo "});";
				echo "});";
				echo "</script>";
				$i=$i+1;
			}
			$indivGraphs=strtok(",");
		}	




		mysqli_close($con);
			
		?>
        <script>
/*        $(function () { 
    $('#mydiv').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Fruit Consumption'
        },
        xAxis: {
            categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: 'Jane',
            data: [1, 0, 4]
        }, {
            name: 'John',
            data: [5, 7, 3]
        }]
    });
});
    $(function () { 
    $('#memPerc').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Fruit Consumption'
        },
        xAxis: {
            categories: ['Mango', 'Pineapple', 'Grapes']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: 'Jane',
            data: [1, 0, 4]
        }, {
            name: 'John',
            data: [5, 7, 3]
        }]
    });
});
/*
        </script>
	
<hr>	

</body>

</html>
