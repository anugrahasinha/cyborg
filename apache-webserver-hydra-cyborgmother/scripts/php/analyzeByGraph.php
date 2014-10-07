<html>

        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
        <script src="http://code.highcharts.com/highcharts.js"></script>

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
		$indivPid=strtok($pid,",");
		$i=1;
		while ($indivPid !== false)
		{
			$divCreate="<div id=\"" . "div" . $i . "\" style=\"width:1240px;height:300px;\"></div><br>";
			echo $divCreate;
			$commandNameQuery="SELECT command FROM " . $tab . " WHERE pid=" . $indivPid;
			$commandNameQueryResult = mysqli_query($con,$commandNameQuery);
			$row=mysqli_fetch_array($commandNameQueryResult);
			$queryCommandName=$row['command'];
			$query="SELECT timelog,pid,cpuPerc,memPerc,timeUsed,memUsed,command,virt FROM " . $tab . " WHERE pid=" . $indivPid . " ORDER BY timelog";
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
			echo "title: {";
			echo "text: '" . $queryCommandName . "- PID:" . $indivPid . "'";
			echo "},";
			echo "xAxis: {";
			$categories="categories: [";
			$cpuPerc="data: [";
			$memPerc="data: [";
			$memUsed="data: [";
			$timeUsed="data: [";
			$virt="data: [";
			$index=0;
			while($row = mysqli_fetch_array($queryresult))
			{
				if ($index == "0")
				{
					$categories=$categories . "'" . $row['timelog'] . "'";
					$cpuPerc=$cpuPerc . $row['cpuPerc'];
					$memPerc=$memPerc . $row['memPerc'];
					$memUsed=$memUsed . $row['memUsed'];
					$virt=$virt . $row['virt'];
				}
				else
				{
					$categories=$categories . ", '" . $row['timelog'] . "'";
					$cpuPerc=$cpuPerc . ", " . $row['cpuPerc'];
					$memPerc=$memPerc . ", " . $row['memPerc'];
					$memUsed=$memUsed . ", " . $row['memUsed'];
					$virt=$virt . ", " . $row['virt'];
				}
				$index=$index+1;
			}
			$categories = $categories . "]";
			$cpuPerc = $cpuPerc . "]";
			$memPerc = $memPerc . "]";
			$memUsed = $memUsed . "]";
			$virt = $virt . "]";
			//echo "categories: ['Apples', 'Bananas', 'Oranges']";
			echo "$categories";
			echo "},";
			echo "yAxis: {";
			echo "title: {";
//	                echo "text: 'memPerc cpuPerc'";
	                echo "text: 'SystemMemoryUsed VirtualMemory'";
			echo "}";
			echo "},";
			echo "series: [{";
			echo "name: 'virt',";
			//echo "data: [1, 0, 4]";
			echo "$virt";
			echo "}, {";
//			echo "name: 'memPerc',";
			echo "name: 'SysMemoryUsed',";
			//echo "data: [5, 7, 3]";
//			echo "$memPerc";
			echo "$memUsed";
			echo "}]";
			echo "});";
			echo "});";
			echo "</script>";
			$indivPid=strtok(",");
			$i=$i+1;	
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
