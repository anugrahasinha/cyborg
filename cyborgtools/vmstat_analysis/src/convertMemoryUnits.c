#include<stdio.h>
#include<string.h>
#include<stdlib.h>

int main (int argc, char *argv[])
{
	char memoryInput[100];
	float memoryOutput;
	int i;
	strcpy(memoryInput,argv[1]);
	char memoryUnitChar = memoryInput[(strlen(memoryInput)-1)];
	if ( (memoryUnitChar >= 65 && memoryUnitChar <=90) || (memoryUnitChar >= 97 && memoryUnitChar <= 122))
	{
		if (memoryUnitChar == 'k')
		{
			char toConvertMemoryUnitChar[100];
			for (i=0;i<strlen(memoryInput)-1;i++)
			{
				toConvertMemoryUnitChar[i]=memoryInput[i];
			}
			toConvertMemoryUnitChar[strlen(memoryInput)-1]='\0';
			memoryOutput=atof(toConvertMemoryUnitChar);
			memoryOutput=memoryOutput*1024;
			
		}
		else if (memoryUnitChar == 'm')
		{
                        char toConvertMemoryUnitChar[100];
                        for (i=0;i<strlen(memoryInput)-1;i++)
                        {
                                toConvertMemoryUnitChar[i]=memoryInput[i];
                        }
                        toConvertMemoryUnitChar[strlen(memoryInput)-1]='\0';
                        memoryOutput=atof(toConvertMemoryUnitChar);
                        memoryOutput=memoryOutput*1024*1024;
		}
		else if (memoryUnitChar == 'g')
		{
                        char toConvertMemoryUnitChar[100];
                        for (i=0;i<strlen(memoryInput)-1;i++)
                        {
                                toConvertMemoryUnitChar[i]=memoryInput[i];
                        }
                        toConvertMemoryUnitChar[strlen(memoryInput)-1]='\0';
                        memoryOutput=atof(toConvertMemoryUnitChar);
                        memoryOutput=memoryOutput*1024*1024*1024;
		}
	}
	else
	{
		memoryOutput=atof(memoryInput);
		memoryOutput=memoryOutput*1024;
	}
	printf("%f",memoryOutput);
	return 0;
}
