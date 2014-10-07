#include<stdio.h>
#include<stdlib.h>
#include<dirent.h>
#include<time.h>

int startProfile(int monitorProcessPID, char *procPIDPath )
{
	char statusFile[6]="status";
	char VmPeakChar[50];
	int VmPeak;
	char VmSizeChar[50];
	int VmSize;
	char VmHWMChar[50];
	int VmHWM;
	char VmRSSChar[50];
	int VmRSS;
	char VmDataChar[50];
	int VmData;
	char VmStkChar[50];
	int VmStk;
	char cmdline[512];
	DIR *procPIDDirectory;
	int taskArr[256];
        char logFileName[1024];
        sprintf(logFileName,"%s%d","/var/log/HYDRAstor/process_profiler_",monitorProcessPID);
	FILE *logFileWrite;	
	procPIDDirectory=opendir(procPIDPath);
	if (! procPIDDirectory) // /proc/<pid>/ directory not available
	{
		printf("\n Unable to open proc information for PID=%d at location %s\n",monitorProcessPID,procPIDPath);
		return 1;
	}
	else // /proc/<pid>/ directory available
	{
		printf("\n proc directory opened at %s\n",procPIDPath);
		logFileWrite=fopen(logFileName,"a");
		fputs("---------------------------------------------------------------------------------------------\n",logFileWrite);
		fputs("Date                  PID   VmPeak   VmSize   VmHWM   VmRSS   VmData   VmStk   CmdLine   Parent\n",logFileWrite);
		fputs("---------------------------------------------------------------------------------------------\n",logFileWrite);
		fclose(logFileWrite);
		while (procPIDDirectory) // Continue till the process is alive
		{
			char taskDirectory[1026];
			sprintf(taskDirectory,"%s%s",procPIDPath,"task/"); // /proc/<pid>/task/
			DIR *processTaskDirectory; 
			processTaskDirectory=opendir(taskDirectory);
			if (! processTaskDirectory) // /proc/<pid>/task/ is not available
			{
				printf("\n Unable to open tasks directory for PID=%s at %s",monitorProcessPID,taskDirectory);
				return 1;
			}
			else // /proc/<pid>/task/ is available
			{
				int index=0;
				while (1) // read until all entries are read
				{
					struct dirent *entry;
					entry=readdir(processTaskDirectory);
					if (!entry) // No more directories/files in this directory
					{
						printf("\n All tasks added to array\n");
						break;
					}
					if (entry->d_type & DT_DIR)
					{
						if (strcmp(entry->d_name,".")!=0 && strcmp(entry->d_name,"..")!=0) // not including . and .. directories
						{
							taskArr[index]=atoi(entry->d_name);
							printf("\n child directory in path=%s is %s%d",taskDirectory,taskDirectory,taskArr[index]);
							++index;
						}
					}
				}
				closedir(processTaskDirectory);
				int i;
				time_t rawtime;
				struct tm * timeinfo;
				time ( &rawtime );
				timeinfo = localtime ( &rawtime );
				char timenow[256];
				strftime(timenow,256,"%F %T",timeinfo);
				for (i=0;i<index;i++)
				{
					char filename[512];
					char command[1024];
					FILE *pFile;
					sprintf(filename,"%s%d%s%d%s","/proc/",monitorProcessPID,"/task/",taskArr[i],"/status");
					sprintf(command,"%s%s%s","cat ",filename," | grep \"VmPeak\" | awk -F\":\" '{print $2}' | awk -F\" \" '{print $1}'");
					pFile = popen(command,"r");
					fgets(VmPeakChar,100,pFile);
					pclose(pFile);
					VmPeak=atoi(VmPeakChar);
                                        sprintf(command,"%s%s%s","cat ",filename," | grep \"VmSize\" | awk -F\":\" '{print $2}' | awk -F\" \" '{print $1}'");
                                        pFile = popen(command,"r");
                                        fgets(VmSizeChar,100,pFile);
                                        pclose(pFile);
					VmSize=atoi(VmSizeChar);
                                        sprintf(command,"%s%s%s","cat ",filename," | grep \"VmHWM\" | awk -F\":\" '{print $2}' | awk -F\" \" '{print $1}'");
                                        pFile = popen(command,"r");
                                        fgets(VmHWMChar,100,pFile);
                                        pclose(pFile);
					VmHWM=atoi(VmHWMChar);
                                        sprintf(command,"%s%s%s","cat ",filename," | grep \"VmRSS\" | awk -F\":\" '{print $2}' | awk -F\" \" '{print $1}'");
                                        pFile = popen(command,"r");
                                        fgets(VmRSSChar,100,pFile);
                                        pclose(pFile);
					VmRSS=atoi(VmRSSChar);
                                        sprintf(command,"%s%s%s","cat ",filename," | grep \"VmData\" | awk -F\":\" '{print $2}' | awk -F\" \" '{print $1}'");
                                        pFile = popen(command,"r");
                                        fgets(VmDataChar,100,pFile);
                                        pclose(pFile);
					VmData=atoi(VmDataChar);
                                        sprintf(command,"%s%s%s","cat ",filename," | grep \"VmStk\" | awk -F\":\" '{print $2}' | awk -F\" \" '{print $1}'");
                                        pFile = popen(command,"r");
                                        fgets(VmStkChar,100,pFile);
                                        pclose(pFile);
					VmStk=atoi(VmStkChar);
					sprintf(filename,"%s%d%s%d%s","/proc/",monitorProcessPID,"/task/",taskArr[i],"/cmdline");
					sprintf(command,"%s%s","cat ",filename);
					pFile = popen(command,"r");
					fgets(cmdline,100,pFile);
					pclose(pFile);
					char output[2056];
					if (taskArr[i]==monitorProcessPID)
						sprintf(output,"%s%s%d%s%d%s%d%s%d%s%d%s%d%s%d%s%s%s",timenow,"   ",taskArr[i],"   ",VmPeak,"KB   ",VmSize,"KB   ",VmHWM,"KB   ",VmRSS,"KB   ",VmData,"KB   ",VmStk,"KB   ",cmdline,"   *\n");
					else
						sprintf(output,"%s%s%d%s%d%s%d%s%d%s%d%s%d%s%d%s%s%s",timenow,"   ",taskArr[i],"   ",VmPeak,"KB   ",VmSize,"KB   ",VmHWM,"KB   ",VmRSS,"KB   ",VmData,"KB   ",VmStk,"KB   ",cmdline,"   \n");
			                logFileWrite=fopen(logFileName,"a");
			                fputs(output,logFileWrite);
                			fclose(logFileWrite);
				}
			}
			closedir(procPIDDirectory);
			sleep(1);
			procPIDDirectory=opendir(procPIDPath);
		}
	}
	return 0;
}


int main(int argc, char *argv[])
{
	int monitorProcessPID=atoi(argv[1]);
	char procPIDPath[1026];
	sprintf(procPIDPath,"%s%d%s","/proc/",monitorProcessPID,"/");
	printf("\n Processing PID=%d at Path=%s",monitorProcessPID,procPIDPath);
	int profile_ret=startProfile(monitorProcessPID,procPIDPath);
	return profile_ret;
}
