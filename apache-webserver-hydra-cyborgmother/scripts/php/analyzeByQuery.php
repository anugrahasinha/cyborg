<?php
$query=$_GET["query"];
echo "<p>Query Submitted : $query</p>";

$con=mysqli_connect("hydra-cyborgmother.nectechnologies.in","necbuilder","necbuilder@123","actlog_top");

// Check connection
if (mysqli_connect_errno()) 
{
	echo "<p>Failed to connect to MySQL: " . mysqli_connect_error() . "</p><br>";
}
#else
#{
#	echo "<p>Connect to DB successful</p>";
#}

$queryresult = mysqli_query($con,$query);

echo "
<table border='1'>
<th>date</th>
<th>time</th>
<th>PID</th>
<th>PPID</th>
<th>VIRT</th>
<th>RES</th>
<th>SHR</th>
<th>Command</th>";


while($row = mysqli_fetch_array($queryresult))
{
	echo "<tr>";
		echo "<td>" . $row['datelog'] . "</td>";
		echo "<td>" . $row['timelog'] . "</td>";
		echo "<td>" . $row['pid'] . "</td>";
		echo "<td>" . $row['ppid'] . "</td>";
		echo "<td>" . $row['virt'] . "</td>";
		echo "<td>" . $row['res'] . "</td>";
		echo "<td>" . $row['shr'] . "</td>";
		echo "<td>" . $row['command'] . "</td>";
	echo "</tr>";
}

echo "</table>";
mysqli_close($con);
?>
