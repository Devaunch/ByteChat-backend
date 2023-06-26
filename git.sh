git add .

read -p "Wanna commit?: " commitorNot
if [ $commitorNot == "yes" ]
then
	read -p "Enter commit msg: " commitMsg
	git commit -m "${commitMsg}"
fi

read -p "Wanna push?: " push
if [ $push == "yes" ]
then
	git push origin HEAD
fi
