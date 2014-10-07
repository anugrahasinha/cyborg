<!DOCTYPE html>
<html>

<script>
	function loadBody()
	{
			
	}
</script>


<body>
<table id="availableDBTable" border='1'>
	<th>Available Tables</th>
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
		$queryresult = mysqli_query($con,"show tables");
		while ($row = mysqli_fetch_array($queryresult))
		{
			echo "<tr>"; 
			echo "<td>" . $row['Tables_in_actlog_top'] . "</td>";
			echo "</tr>";
		}
	?>
</table>
<h3>Column Mapping</h3>
<table border='1'>
<tr>
	<td>Actlog top Column Values</td>
	<td>Date</td>
	<td>Time</td>
	<td>PID - ProcessID</td>
	<td>PPID- Parent Process ID</td>
	<td>User</td>
	<td>tty</td>
	<td>PR  - Priority</td>
	<td>ni  - Nice Value</td>
	<td>nflt</td>
	<td>VIRT- Virtual Memory</td>
	<td>RES - Resident Memory</td>
	<td>SHR - Shared Memory</td>
	<td>ndrt</td>
	<td>WCHAN - Wait Chain</td>
	<td>FLAGS</td>
	<td>State</td>
	<td>CPU%</td>
	<td>MEM%</td>
	<td>Time - CPU Time Used</td>
	<td>P - Priority</td>
	<td>Command</td>
</tr>
<tr>
        <td>Database Column Values</td>
        <td>datelog</td>
        <td>timelog</td>
        <td>pid</td>
        <td>ppid</td>
        <td>user</td>
        <td>tty</td>
        <td>pr</td>
        <td>ni</td>
        <td>nflt</td>
        <td>virt</td>
        <td>res</td>
        <td>shr</td>
        <td>ndrt</td>
        <td>wchan</td>
        <td>flags</td>
        <td>state</td>
        <td>cpuPerc</td>
        <td>memPerc</td>
        <td>timeUsed</td>
        <td>pVal</td>
        <td>command</td>
</tr>
	
</table>
</body>

</html>
