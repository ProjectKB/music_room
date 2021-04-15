
echo "
0: exit
1: run
2: creat release
3: clear cache
4: voir les appareils connectés"

read choice


if [ $choice == 0 ];
then
	clear
	exit 0

elif [ $choice == 1 ];
then
	echo "run app"
	cd android && ./gradlew clean
	chmod +x gradle
	cd ..
	npx react-native run-android

elif [ $choice == 2 ];
then
	echo "creat release:"
	cd android && ./gradlew clean
	chmod +x gradle
	cd ..
	npx react-native run-android --variant=release
elif [ $choice == 3 ];
then
	npm start -- --reset-cache
elif [ $choice == 4 ];
then
	adb devices
fi

echo "Run Run Ruuuuuuuuuuuuun !!"
