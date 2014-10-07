#include<stdio.h>
#include<string.h>
#include<time.h>
#include<stdlib.h>

int main(int argc, char *argv[])
{
	char *dateSave=argv[1];
	char *timeSave=argv[2];
	struct tm dataSave;
	char *d1 = strtok(dateSave,"-");
	dataSave.tm_year = atoi(d1) - 1900;
	dataSave.tm_mon = atoi(strtok(NULL,"-")) - 1;
	dataSave.tm_mday = atoi(strtok(NULL,"-"));
	char *d2 = strtok(timeSave,":");
	dataSave.tm_hour = atoi(d2);
	dataSave.tm_min = atoi(strtok(NULL,":"));
	dataSave.tm_sec = atoi(strtok(NULL,":"));
	time_t convertedTime = mktime(&dataSave);
	printf("\n Converted Time: %s",ctime(&convertedTime));
	return 0;
				
}
