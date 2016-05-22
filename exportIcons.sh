#!/bin/bash

inkscapePath="C:/work/inkscape/inkscapePortable.exe"

sizes=(16 32 64)

for f in icons/*.svg
do
	for i in "${sizes[@]}"
	do
		filename=`basename $f .svg`
		pngName="${filename}-${i}.png"
		echo $pngName
		# shell mode doesn't seem to work with inkscape portable
		# so call inkscape for each image
		$inkscapePath --without-gui --export-png data/$pngName -w $i $f
	done
done