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

/export/user_share/builder/cyborgtools/top_pid_analysis/bin/distribute_top ${filename_dec}

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

exit 0

echo "CREATE TABLE $tableName (sno bigint, datelog varchar(50), timelog varchar(50), taskTotal int, taskRunning int, taskSleeping int, taskStopped int, taskZombie int, memTotal float, memUsed float, memFree float, memBuffer float, swapTotal float, swapUsed float, swapFree float, swapCached float, pid int, ppid int, user varchar(50), tty varchar(10), pr varchar(10), ni varchar(5), nflt varchar(5), virt float, res float, shr float, ndrt varchar(10), wchan varchar(50), flags varchar(10), state varchar(10), cpuPerc decimal(10,2), memPerc decimal(10,2), timeUsed varchar(50), pValue varchar(10), command varchar(255));" > "${tableName}_createTable.sql"

mysql -u necbuilder -h 127.0.0.1 --password="necbuilder@123" actlog_top < "${tableName}_createTable.sql"
rm -rf "${tableName}_createTable.sql"

listoffiles=""

while read line
do
	listoffiles="${listoffiles}${line} "
done < file
#rm -rf file
	/export/user_share/builder/cyborgtools/top_pid_analysis/bin/parallelReadTopFile $tableName $listoffiles
exit 0

