#define _GNU_SOURCE
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

time_t convertedTime(char *d1, char *t1)
{
        char *dateSave=d1;
        char *timeSave=t1;
        struct tm dataSave;
        char *dtok = strtok(dateSave,"-");
        dataSave.tm_year = atoi(dtok) - 1900;
        dataSave.tm_mon = atoi(strtok(NULL,"-")) - 1;
        dataSave.tm_mday = atoi(strtok(NULL,"-"));
        char *ttok = strtok(timeSave,":");
        dataSave.tm_hour = atoi(ttok);
        dataSave.tm_min = atoi(strtok(NULL,":"));
        dataSave.tm_sec = atoi(strtok(NULL,":"));
	time_t abcd = mktime(&dataSave);
        return mktime(&dataSave);
}

void createTable(char *tableName)
{
	char query[1500];
	sprintf(query,"CREATE TABLE %s (sno bigint, datelog varchar(50), timelog varchar(50), taskTotal int, taskRunning int, taskSleeping int, taskStopped int, taskZombie int, memTotal float, memUsed float, memFree float, memBuffer float, swapTotal float, swapUsed float, swapFree float, swapCached float, pid int, ppid int, user varchar(50), tty varchar(10), pr varchar(10), ni varchar(5), nflt varchar(5), virt float, res float, shr float, ndrt varchar(10), wchan varchar(50), flags varchar(10), state varchar(10), cpuPerc decimal(4,4), memPerc decimal(4,4), timeUsed varchar(50), pValue varchar(10), command varchar(255));",tableName);
	FILE *newfp = fopen("createTable.sql","w");
	fprintf(newfp,"%s",query);
	fclose(newfp);
	char sqlCommand[150];
	sprintf(sqlCommand,"mysql -h hydra-cyborgmother.nectechnologies.in -u necbuilder --password='necbuilder@123' actlog_top < createTable.sql");
	system(sqlCommand);
	
}


int main(int argc, char *argv[])
{
        FILE * fp;
        char * line = NULL;
        size_t len = 0;
        ssize_t read;
        fp = fopen(argv[1], "r");
	char filenameOutput[30];
	char *dateInputFrom=argv[2];
	char *timeInputFrom=argv[3];
	time_t inputTimeFrom = convertedTime(dateInputFrom,timeInputFrom);
	char *dateInputTo=argv[4];
	char *timeInputTo=argv[5];
	time_t inputTimeTo = convertedTime(dateInputTo,timeInputTo);
	char *tableName=argv[6];
	char *dateSave;
	char *timeSave;
	char listFilename[1500][50];
	int index=0;
	int doTokenize=1;
        if (fp == NULL)
                exit(EXIT_FAILURE);
        while ((read = getline(&line, &len, fp)) != -1) 
	{
                //printf("Retrieved line of length %zu :\n", read);
                if ( (strstr(line,"-----")) || (strstr(line,"=====")))
		{
			doTokenize=1;
			sprintf(filenameOutput,"%s","");
			continue;
		}
		if (doTokenize == 1)
		{
			char saveLine[4096];
			strcpy(saveLine,line);
			dateSave=strtok(saveLine," ");
			timeSave=strtok(NULL," ");
			char dateSaveNew[20];
			strcpy(dateSaveNew,dateSave);
			char timeSaveNew[20];
			strcpy(timeSaveNew,timeSave);
			time_t checkTime = convertedTime(dateSaveNew,timeSaveNew);
			if ( difftime(inputTimeTo,checkTime) >=0 && difftime(checkTime,inputTimeFrom) >=0 )
			{
				sprintf(filenameOutput,"%s_%s.out",dateSave,timeSave);
				sprintf(listFilename[index],"%s",filenameOutput);
				++index;
			}
			else if ( difftime(checkTime,inputTimeTo) > 0 && difftime(checkTime,inputTimeFrom) > 0 )
			{
				break;
			}
			doTokenize=0;
		}
		FILE *fpWrite = fopen(filenameOutput,"a");
		if (!fpWrite)
		{
			printf("Output File: %s could not be opened.\n",filenameOutput);
			exit(EXIT_FAILURE);
		}
		fputs(line,fpWrite);
		fclose(fpWrite);
//		printf("%s", line);
        }
        if (line)
                free(line);
/*	createTable(tableName);
	int i=0;
	int lineNo=0;
	while (i<index)
	{
		lineNo=0;
		fp = fopen(listFilename[i], "r");
		while ((read = getline(&line, &len, fp)) != -1)
		{
			if (lineNo < 6)
			{
				
			}
			else
			{
			}
		}
		++i;
	}
*/
        return EXIT_SUCCESS;
}
