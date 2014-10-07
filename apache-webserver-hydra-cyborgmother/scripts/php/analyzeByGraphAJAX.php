<?php

	$con=mysqli_connect("hydra-cyborgmother.nectechnologies.in","necbuilder","necbuilder@123","actlog_top");
	// Check connection
	if (mysqli_connect_errno())
        {
        	echo "<p>Failed to connect to MySQL: " . mysqli_connect_error() . "</p><br>";
        }
        #else
        #{
        #        echo "<p>Connect to DB successful</p><br>";
        #}
	$fetch=$_GET["fetch"];
	$table=$_GET["table"];
	$datelog=$_GET["date"];
	$timelog=$_GET["time"];
	$pid=$_GET["pid"];
	$command=$_GET["command"];
	$filter=$_GET["filter"];
	if ($filter != "YES")
	{
		if ( $fetch == "tableName" )
		{
			$serverResponse="table";
			$query="show tables";
	        	$queryresult = mysqli_query($con,$query);
		        while ($row = mysqli_fetch_array($queryresult))
			{
	                	$serverResponse=$serverResponse . "," . $row['Tables_in_actlog_top'];
	        	}
		}
		else if ( $fetch == "date" )
		{
	                $serverResponse="date";
	                $query="select DISTINCT datelog from " . $table . " ORDER BY datelog";
	                $queryresult = mysqli_query($con,$query);
	                while ($row = mysqli_fetch_array($queryresult))
	                {
	                        $serverResponse=$serverResponse . "," . $row['datelog'];
	                }
		}
		else if ( $fetch == "time" )
		{
	                $serverResponse="time,all";
	                $query="select DISTINCT timelog,datelog from " . $table . "  WHERE datelog IN (" . $datelog . ") ORDER BY timelog";
	                $queryresult = mysqli_query($con,$query);
	                while ($row = mysqli_fetch_array($queryresult))
	                {
	                        $serverResponse=$serverResponse . "," . $row['timelog'];
	                }
		}
		else if ( $fetch == "pid" )
		{
			$serverResponse="pid";
			$query = "select DISTINCT pid from " . $table . " WHERE datelog in (" . $datelog . ") AND timelog IN (" . $timelog . ") ORDER BY pid";
			$queryresult = mysqli_query($con,$query);
			while ($row = mysqli_fetch_array($queryresult))
			{
	                        $serverResponse=$serverResponse . "," . $row['pid'];
	        	}
		}
		else if ( $fetch == "command" )
		{
			if ($pid == "NODATA")
			{	
	                	$serverResponse="command";
		                $query = "select DISTINCT command from " . $table . " WHERE datelog in (" . $datelog . ") AND timelog IN (" . $timelog . ") ORDER BY command";
		                $queryresult = mysqli_query($con,$query);
		                while ($row = mysqli_fetch_array($queryresult))
		                {
		                        $serverResponse=$serverResponse . "," . $row['command'];
		                }
			}
		}
		echo $serverResponse;
	}
	else
	{
		if ($fetch == "pid")
		{
			$serverResponse="pid";
			if ($pid == "NODATA")
			{
				if ($command != "")
				{
					$query = "select DISTINCT pid from " . $table . " WHERE datelog in (" . $datelog . ") AND timelog IN (" . $timelog . ") AND command LIKE ('%" . $command . "%') ORDER BY pid";
				}
				else
				{
					$query = "select DISTINCT pid from " . $table . " WHERE datelog in (" . $datelog . ") AND timelog IN (" . $timelog .
") ORDER BY pid";
				}
			}
			else
			{
				if ($pid != "''")
				{
					$query = "select DISTINCT pid from " . $table . " WHERE datelog in (" . $datelog . ") AND timelog IN (" . $timelog . ") AND pid IN (" . $pid . ") ORDER BY pid";
				}
				else
				{
					$query = "select DISTINCT pid from " . $table . " WHERE datelog in (" . $datelog . ") AND timelog IN (" . $timelog . ") ORDER BY pid";
				}
			}
			$queryresult = mysqli_query($con,$query);
			while ($row = mysqli_fetch_array($queryresult))
			{
				$serverResponse=$serverResponse . "," . $row['pid'];
			}
		}
		if ($fetch == "command")
		{
			$serverResponse="command";
                        if ($pid == "NODATA")
			{
                                if ($command != "")
                                {
                                        $query = "select DISTINCT command from " . $table . " WHERE datelog in (" . $datelog . ") AND timelog IN (" . $timelog .") AND command LIKE ('%" . $command . "%') ORDER BY pid";
                                }
                                else
                                {
                                        $query = "select DISTINCT command from " . $table . " WHERE datelog in (" . $datelog . ") AND timelog IN (" . $timelog .") ORDER BY pid";
                                }

			}
			else
			{
				if ($pid != "''")
				{			
					$query = "select DISTINCT command from " . $table . " WHERE datelog in (" . $datelog . ") AND timelog IN (" . $timelog . ") AND pid IN (" . $pid . ") ORDER BY pid";
				}
				else
				{
					$query = "select DISTINCT command from " . $table . " WHERE datelog in (" . $datelog . ") AND timelog IN (" . $timelog . ") ORDER BY command";
				}
			}
			$queryresult = mysqli_query($con,$query);
			while ($row = mysqli_fetch_array($queryresult))
			{
				$serverResponse=$serverResponse . "," . $row['command'];
			}
		}
		echo $serverResponse;
	}
	mysqli_close($con);
?>
