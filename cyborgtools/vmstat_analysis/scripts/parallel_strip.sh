#!/bin/bash

        datesv=`echo $1 | awk -F"." '{print$1}' | awk -F"_" '{print $1}'`
        timesv=`echo $1 | awk -F"." '{print$1}' | awk -F"_" '{print $2}'`
        lineno=1
        sno=0
	tableName=$2
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
                                memTotal=`/export/user_share/builder/cyborgtools/top_pid_analysis/bin/convertMemoryUnits $memTotalOrig`
                                memUsedOrig=`echo $dataline | awk -F"," '{print$2}' | awk -F" " '{print $1}'`
                                memUsed=`/export/user_share/builder/cyborgtools/top_pid_analysis/bin/convertMemoryUnits $memUsedOrig`
                                memFreeOrig=`echo $dataline | awk -F"," '{print$3}' | awk -F" " '{print $1}'`
                                memFree=`/export/user_share/builder/cyborgtools/top_pid_analysis/bin/convertMemoryUnits $memFreeOrig`
                                memBufferOrig=`echo $dataline | awk -F"," '{print$4}' | awk -F" " '{print $1}'`
                                memBuffer=`/export/user_share/builder/cyborgtools/top_pid_analysis/bin/convertMemoryUnits $memBufferOrig`
                                continue
                        fi
                        echo $dataline | grep -q "Swap"
                        if [ $? -eq 0 ]; then
                                swapTotalOrig=`echo $dataline | awk -F"," '{print$1}' | awk -F" " '{print$4}'`
                                swapTotal=`/export/user_share/builder/cyborgtools/top_pid_analysis/bin/convertMemoryUnits $swapTotalOrig`
                                swapUsedOrig=`echo $dataline | awk -F"," '{print$2}' | awk -F" " '{print $1}'`
                                swapUsed=`/export/user_share/builder/cyborgtools/top_pid_analysis/bin/convertMemoryUnits $swapUsedOrig`
                                swapFreeOrig=`echo $dataline | awk -F"," '{print$3}' | awk -F" " '{print $1}'`
                                swapFree=`/export/user_share/builder/cyborgtools/top_pid_analysis/bin/convertMemoryUnits $swapFreeOrig`
                                swapCachedOrig=`echo $dataline | awk -F"," '{print$4}' | awk -F" " '{print $1}'`
                                swapCached=`/export/user_share/builder/cyborgtools/top_pid_analysis/bin/convertMemoryUnits $swapCachedOrig`
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
                virt=`/export/user_share/builder/cyborgtools/top_pid_analysis/bin/convertMemoryUnits $virtOrig`
                resOrig=`echo $dataline | awk -F" " '{print$11}'`
                res=`/export/user_share/builder/cyborgtools/top_pid_analysis/bin/convertMemoryUnits $resOrig`
                shrOrig=`echo $dataline | awk -F" " '{print$12}'`
                shr=`/export/user_share/builder/cyborgtools/top_pid_analysis/bin/convertMemoryUnits $shrOrig`
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
                echo "INSERT INTO $tableName $columns VALUES $values;" >> line.sql.$$
        done < $1
        mysql -u necbuilder -h 127.0.0.1 --password="necbuilder@123" actlog_top < line.sql.$$
#       rm -rf line.sql
        mv line.sql.$$ line.sql1.$$
