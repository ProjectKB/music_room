
echo "
0: exit
1: run
2: creat release
3: clear cache
4: voir les appareils connectés
5: Dependences"

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
elif [ $choice == 5 ];
then
	brew install node
	brew install watchman
	brew install --cask adoptopenjdk/openjdk/adoptopenjdk8
	brew install android-platform-tools
	npm install -g npx
#	echo 'export ANDROID_HOME=$HOME/Library/Android/sdk
#export PATH=$PATH:$ANDROID_HOME/emulator
#export PATH=$PATH:$ANDROID_HOME/tools
#export PATH=$PATH:$ANDROID_HOME/tools/bin
#export PATH=$PATH:$ANDROID_HOME/platform-tools' >> ~/.zshrc
	source ~/.zshrc
fi

echo "Run Run Ruuuuuuuuuuuuun !!"
