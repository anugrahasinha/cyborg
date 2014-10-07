#!/bin/bash

if [ $# -lt 1 ]; then
	echo "Provide filename to operate upon"
	exit 1
fi

filename=$1
rangefrom="$2 $3"
rangeto="$4 $5"
JIRA_name="$6"
epoch_rangefrom=`date -d"$rangefrom GMT" +"%s"`
epoch_rangeto=`date -d"$rangeto GMT" +"%s"`
username="`whoami`"

if [ ! -f $filename ]; then
	echo "Filename does not exist"
	exit 1
fi

filename_dec="`basename $filename`.dec"
if [ ! -d ./distribute ]; then
	mkdir distribute
fi

cd distribute

if [ ! -f $filename_dec ]; then
	/usr/sbin/decode_actlog $filename > ${filename_dec}
fi

rm -rf *.summary *.out

genNewFile=0
datesv=""
timesv=""
#while read line
#do

#	echo $line | egrep -q "\-\-\-\-\-\-\-\-\-\-|======="
#	if [ $? -eq 0 ]; then
#		genNewFile=1
#		datesv=""
#		timesv=""
#		continue
#	fi
#	if [ $genNewFile -eq 1 ]; then
#		datesv=`echo $line | awk -F" " '{print$1}'`
#		timesv=`echo $line | awk -F" " '{print$2}'`
#		genNewFile=0
#	fi
#	output_file=${datesv}_${timesv}.out
#	epoch_this=`date -d"$datesv $timesv GMT" +"%s"`
#	if [[ $epoch_this -ge $epoch_rangefrom && $epoch_this -le $epoch_rangeto ]]; then
#		echo $line >> "$output_file"
#		continue
#	fi
#	if [ $epoch_this -gt $epoch_rangeto ]; then
#		break
#	fi
#done < $filename_dec

/export/user_share/asinha/NEC_work/top_pid_analysis/bin/distribute_top ${filename_dec}

find . -type f -name "*.out" > file.comp
#touch "${username}_${JIRA_name}_createTable.sql"
tableName="${username}_${JIRA_name}"

while read line
do
	datecheck="`basename $line | awk -F"." '{print $1}' | awk -F"_" '{print$1}'`"
	timecheck="`basename $line | awk -F"." '{print $1}' | awk -F"_" '{print$2}'`"
	epoch_this=`date -d"$datecheck $timecheck GMT" +"%s"`
	if [[ $epoch_this -ge $epoch_rangefrom && $epoch_this -le $epoch_rangeto ]]; then
		echo $line >> file
	fi
done < file.comp

echo "CREATE TABLE $tableName (sno bigint, datelog varchar(50), timelog varchar(50), taskTotal int, taskRunning int, taskSleeping int, taskStopped int, taskZombie int, memTotal float, memUsed float, memFree float, memBuffer float, swapTotal float, swapUsed float, swapFree float, swapCached float, pid int, ppid int, user varchar(50), tty varchar(10), pr varchar(10), ni varchar(5), nflt varchar(5), virt float, res float, shr float, ndrt varchar(10), wchan varchar(50), flags varchar(10), state varchar(10), cpuPerc decimal(10,2), memPerc decimal(10,2), timeUsed varchar(50), pValue varchar(10), command varchar(255));" > "${tableName}_createTable.sql"

mysql -u necbuilder -h 127.0.0.1 --password="necbuilder@123" actlog_top < "${tableName}_createTable.sql"
rm -rf "${tableName}_createTable.sql"

while read line
do
	datesv=`echo $line | awk -F"." '{print$1}' | awk -F"_" '{print $1}'`
	timesv=`echo $line | awk -F"." '{print$1}' | awk -F"_" '{print $2}'`
	lineno=1
	sno=0
	while read dataline
	do
		if [ $lineno -le 6 ]; then
			((lineno++))
			echo $dataline | grep -q "Tasks"
			if [ $? -eq 0 ]; then
				taskTotal=`echo $dataline | awk -F"," '{print$1}' | awk -F" " '{print$4}'`
				taskRunning=`echo $dataline | awk -F"," '{print$2}' | awk -F" " '{print $1}'`
				taskSleeping=`echo $dataline | awk -F"," '{print$3}' | awk -F" " '{print $1}'`
				taskStopped=`echo $dataline | awk -F"," '{print$4}' | awk -F" " '{print $1}'`
				taskZombie=`echo $dataline | awk -F"," '{print$4}' | awk -F" " '{print $1}'`
				continue
			fi
			echo $dataline | grep -q "Mem"
			if [ $? -eq 0 ]; then
				memTotalOrig=`echo $dataline | awk -F"," '{print$1}' | awk -F" " '{print$4}'`
				memTotal=`/export/user_share/asinha/NEC_work/top_pid_analysis/bin/convertMemoryUnits $memTotalOrig`
				memUsedOrig=`echo $dataline | awk -F"," '{print$2}' | awk -F" " '{print $1}'`
				memUsed=`/export/user_share/asinha/NEC_work/top_pid_analysis/bin/convertMemoryUnits $memUsedOrig`
				memFreeOrig=`echo $dataline | awk -F"," '{print$3}' | awk -F" " '{print $1}'`
				memFree=`/export/user_share/asinha/NEC_work/top_pid_analysis/bin/convertMemoryUnits $memFreeOrig`
				memBufferOrig=`echo $dataline | awk -F"," '{print$4}' | awk -F" " '{print $1}'`
				memBuffer=`/export/user_share/asinha/NEC_work/top_pid_analysis/bin/convertMemoryUnits $memBufferOrig`
				continue
			fi
			echo $dataline | grep -q "Swap"
			if [ $? -eq 0 ]; then
				swapTotalOrig=`echo $dataline | awk -F"," '{print$1}' | awk -F" " '{print$4}'`
				swapTotal=`/export/user_share/asinha/NEC_work/top_pid_analysis/bin/convertMemoryUnits $swapTotalOrig`
				swapUsedOrig=`echo $dataline | awk -F"," '{print$2}' | awk -F" " '{print $1}'`
				swapUsed=`/export/user_share/asinha/NEC_work/top_pid_analysis/bin/convertMemoryUnits $swapUsedOrig`
				swapFreeOrig=`echo $dataline | awk -F"," '{print$3}' | awk -F" " '{print $1}'`
				swapFree=`/export/user_share/asinha/NEC_work/top_pid_analysis/bin/convertMemoryUnits $swapFreeOrig`
				swapCachedOrig=`echo $dataline | awk -F"," '{print$4}' | awk -F" " '{print $1}'`
				swapCached=`/export/user_share/asinha/NEC_work/top_pid_analysis/bin/convertMemoryUnits $swapCachedOrig`
				continue
			fi
			continue
		fi
		((sno++))
		columns="(sno,datelog,timelog,taskTotal,taskRunning,taskSleeping,taskStopped,taskZombie,memTotal,memUsed,memFree,memBuffer,swapTotal,swapUsed,swapFree,swapCached,pid,ppid,user,tty,pr,ni,nflt,virt,res,shr,ndrt,wchan,flags,state,cpuPerc,memPerc,timeUsed,pValue,command)"
		datethis=`echo $dataline | awk -F" " '{print$1}'`
		timethis=`echo $dataline | awk -F" " '{print$2}'`
		pid=`echo $dataline | awk -F" " '{print$3}'`
		ppid=`echo $dataline | awk -F" " '{print$4}'`
		user=`echo $dataline | awk -F" " '{print$5}'`
		tty=`echo $dataline | awk -F" " '{print$6}'`
		pr=`echo $dataline | awk -F" " '{print$7}'`
		ni=`echo $dataline | awk -F" " '{print$8}'`
		nflt=`echo $dataline | awk -F" " '{print$9}'`
		virtOrig=`echo $dataline | awk -F" " '{print$10}'`
		virt=`/export/user_share/asinha/NEC_work/top_pid_analysis/bin/convertMemoryUnits $virtOrig`
		resOrig=`echo $dataline | awk -F" " '{print$11}'`
		res=`/export/user_share/asinha/NEC_work/top_pid_analysis/bin/convertMemoryUnits $resOrig`
		shrOrig=`echo $dataline | awk -F" " '{print$12}'`
		shr=`/export/user_share/asinha/NEC_work/top_pid_analysis/bin/convertMemoryUnits $shrOrig`
		ndrt=`echo $dataline | awk -F" " '{print$13}'`
		wchan=`echo $dataline | awk -F" " '{print$14}'`
		flags=`echo $dataline | awk -F" " '{print$15}'`
		state=`echo $dataline | awk -F" " '{print$16}'`
		cpuPerc=`echo $dataline | awk -F" " '{print$17}'`
		memPerc=`echo $dataline | awk -F" " '{print$18}'`
		timeUsed=`echo $dataline | awk -F" " '{print$19}'`
		pValue=`echo $dataline | awk -F" " '{print$20}'`
		command=`echo $dataline | cut -d' ' -f 21-`
		values="($sno,'$datethis','$timethis',$taskTotal,$taskRunning,$taskSleeping,$taskStopped,$taskZombie,'$memTotal','$memUsed','$memFree','$memBuffer','$swapTotal','$swapUsed','$swapFree','$swapCached',$pid,$ppid,'$user','$tty','$pr','$ni','$nflt','$virt','$res','$shr','$ndrt','$wchan','$flags','$state','$cpuPerc','$memPerc','$timeUsed','$pValue','$command')"
		echo "INSERT INTO $tableName $columns VALUES $values;" >> line.sql
	done < $line
	mysql -u necbuilder -h 127.0.0.1 --password="necbuilder@123" actlog_top < line.sql
#	rm -rf line.sql
	mv line.sql line.sql1
done < file
#rm -rf file
exit 0

