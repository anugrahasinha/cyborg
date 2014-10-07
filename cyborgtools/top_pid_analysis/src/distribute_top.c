#define _GNU_SOURCE
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(int argc, char *argv[])
{
        FILE * fp;
        char * line = NULL;
        size_t len = 0;
        ssize_t read;
        fp = fopen(argv[1], "r");
	char filenameOutput[30];
	char *dateSave;
	char *timeSave;
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
			sprintf(filenameOutput,"%s_%s.out",dateSave,timeSave);
			doTokenize=0;
		}
		FILE *fpWrite = fopen(filenameOutput,"a");
		if (!fpWrite)
		{
			printf("Output File could not be opened.\n");
			exit(EXIT_FAILURE);
		}
		fputs(line,fpWrite);
		fclose(fpWrite);
//		printf("%s", line);
        }
        if (line)
                free(line);
        return EXIT_SUCCESS;
}
