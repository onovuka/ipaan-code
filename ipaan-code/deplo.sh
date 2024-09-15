echo "Switching to branch main"
git checkout main

echo "Building app ..."
npm run build

echo "Deploying files to server ..."
scp -r dist/* krienderhoff@137.158.62.185:/var/www/137.158.62.185/

echo "DONE!"