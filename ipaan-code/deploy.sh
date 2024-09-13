echo "Switching to branch master"
git checkout master

echo "building app ..."
npm run dev

echo "Deploying files to server"
scp -r build/* "ip address of server"

echo "Done!"