install:
	npm install

json: 
	npx babel-node src/bin/genDiff.js src/before.json src/after.json

yml:
	npx babel-node src/bin/genDiff.js src/before.yml src/after.yml

ini:
	npx babel-node src/bin/genDiff.js src/before.ini src/after.ini

publish:
	npm publish --dry-run

lint:
	npx eslint ./
