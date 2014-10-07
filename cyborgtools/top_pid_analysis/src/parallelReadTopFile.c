#include<stdio.h>
#include<stdlib.h>
#include<pthread.h>

#define THREAD_MAX 20

struct threadData
{
	char filename[128];
	int threadid;
	char tableName[128];
};

void *executeForFilename(void *d)
{
	struct threadData *data=(struct threadData*)d;
	printf("\n Thread id=%d filename=%s tablename=%s",data->threadid,data->filename,data->tableName);
	char command[256];
	sprintf(command,"%s%s %s","/export/user_share/builder/cyborgtools/top_pid_analysis/scripts/parallel_strip.sh ",data->filename,data->tableName);
	system(command);
	printf("\n end of thread id = %d filename=%s",data->threadid,data->filename);
	free(data);
}


int main(int argc, char *argv[])
{
	
	int i,rc;
	char *filename;
	pthread_t threads[THREAD_MAX];
	printf("\n Total Files to process=%d and Parallel Execution threads=%d",argc,THREAD_MAX);
	for (i=2;i<argc;)
	{
		
		int j;
		for (j=0;j<THREAD_MAX && i<argc;j++)
		{
			filename=argv[i];
			struct threadData *data;
			data=(struct threadData*)malloc(sizeof(struct threadData));
			sprintf(data->filename,"%s",filename);
			data->threadid=j;
			sprintf(data->tableName,"%s",argv[1]);
			rc=pthread_create(&threads[j],NULL,executeForFilename,(void*)data);
			if(rc)
			{
	                        printf("ERROR; return code from pthread_create() is %d\n", rc);
        	                exit(-1);
			}
			++i;
			//sleep(1);
		}
		int n;
		for(n=0;n<j;n++)
		{
			pthread_join(threads[n],NULL);
		}
	}	
	pthread_exit(NULL);
	return 0;	
}
