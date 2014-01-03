#!/bin/sh

cp platforms/android/res/drawable/icon.png platforms/android/res/drawable-xhdpi/icon.png
convert platforms/android/res/drawable/icon.png -resize 72x72 platforms/android/res/drawable-hdpi/icon.png
convert platforms/android/res/drawable/icon.png -resize 48x48 platforms/android/res/drawable-mdpi/icon.png
convert platforms/android/res/drawable/icon.png -resize 36x36 platforms/android/res/drawable-ldpi/icon.png

