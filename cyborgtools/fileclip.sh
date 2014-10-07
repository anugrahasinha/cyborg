#!/bin/bash

fromline=$1
toline=$2
file=$3
linediff=$(( $toline - $fromline + 1 ))

cat $file | head -n $toline | tail -n $linediff

