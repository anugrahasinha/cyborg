#include<stdio.h>
#include<stdlib.h>
#include<unistd.h>
#include<time.h>
#include<pthread.h>
#include <sys/resource.h>

#define NUM_THREADS 20
#define buffer 32768

float _totalRAM,_fillUpPerc;

void cleanUp(char *base[])
{
        int i;
        for (i=0;i<81920;i++)
        {
                free(base[i]);
        }
}


void *startFilling(void *id)
{
	char *base[81920];
	char *ptr=NULL;
	char checkFreeRAMCommand[256],checkFreeRAM[128];
	sprintf(checkFreeRAMCommand,"%s","cat /proc/meminfo | grep \"MemFree\" | awk -F\":\" '{print $2}' | awk -F\" \" '{print $1}'");
	int threadid=(int)id;
//	printf("\nPushing thread %d",threadid);
//	printf("\n-------------------------------------------------");
	int i,j;
	int isSleeping=0;
        for (i=0;i<81920;i++)
        {
		float currentFreeRAM;
		FILE *pFile = popen(checkFreeRAMCommand,"r");
		fgets(checkFreeRAM,100,pFile);
		pclose(pFile);
		currentFreeRAM=atof(checkFreeRAM);
		if ( ((currentFreeRAM/_totalRAM)*100) <= (100-_fillUpPerc) )
		{
			if (isSleeping == 0)
			{
				printf("\n Thread id=%d entering sleeping mode, as Memory Consumption of System has reached more than %f",threadid,_fillUpPerc);
				printf("\n TotalMemory=%fKB",_totalRAM);
				printf("\n CurrentFreeRAM=%fKB",currentFreeRAM);
				printf("\n-------------------------------------------------");
			}
			isSleeping=1;
			sleep(30);
		}
		else if ( isSleeping == 1 )
		{
			printf("\n Resuming Thread id=%d.......",threadid);
			printf("\n TotalMemory=%fKB",_totalRAM);
			printf("\n CurrentFreeRAM=%fKB",currentFreeRAM);
			printf("\n-------------------------------------------------");
			isSleeping=0;
		}
                base[i]=(char*)malloc(sizeof(char)*buffer);
                ptr=base[i];
                int data=33;
                for (j=0;j<buffer;j++)
                {
                        if (data == 127)
                        {
                                data = 33;
                        }
                        sprintf(ptr,"%s%c",ptr,data);
                        ++data;
                }
        }
	printf("\n Sleeping for thread id=%d",threadid);
	sleep(30);
	printf("\n Starting cleanup for thread id=%d",threadid);
	cleanUp(base);
}


int main(int argc, char *argv[])
{
	printf("\n############ Cyborg Memory Blockup ##############");
	if (argc < 2)
	{
		printf("\n Boooo.....What percentage do you want to fill?");
		printf("\n-------------------------------------------------\n");
		exit(0);
	}
	else if (argc > 2)
	{
		printf("\n Unnecessary arguments given, ignoring them");
	}
	pid_t thispid=getpid();
        int which = PRIO_PROCESS;
        int priority = -20;
        int ret;
        ret = setpriority(which, thispid, priority);
	ret = getpriority(which, thispid);
	printf("\n--- Priority Nice Value for execution of threads = %d",ret);

	pthread_t threads[NUM_THREADS];
	char memcommand[128];
	sprintf(memcommand,"%s%d%s","cat /proc/",(int)thispid,"/status | grep Vm");
	printf("\nCurrent System Memory Status");
	printf("\n-------------------------------------------------");
	system(memcommand);
	_fillUpPerc=atof(argv[1]);
	char checkTotalRAMCommand[256],checkTotalRAM[128];
	sprintf(checkTotalRAMCommand,"%s","cat /proc/meminfo | grep \"MemTotal\" | awk -F\":\" '{print $2}' | awk -F\" \" '{print $1}'");
	FILE *pFile = popen(checkTotalRAMCommand,"r");
	fgets(checkTotalRAM,100,pFile);
	fclose(pFile);
	_totalRAM=atof(checkTotalRAM);
	int rc,i;
	for(i=0;i<NUM_THREADS;i++)
	{	
		rc = pthread_create(&threads[i], NULL, startFilling, (void *)i);
		if (rc){
			printf("ERROR; return code from pthread_create() is %d\n", rc);
			exit(-1);
		}
	}
        printf("\nSystem Memory Status After Spawning Threads");
        printf("\n-------------------------------------------------");
	system(memcommand);

	for (i=0;i<NUM_THREADS;i++)
	{
		pthread_join(threads[i],NULL);
	}

	/* Last thing that main() should do */
	pthread_exit(NULL);
	return 1;
}
