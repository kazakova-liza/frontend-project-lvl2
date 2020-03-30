install:
	npm install

json-tree:
	npx babel-node src/bin/genDiff.js src/files/before_tree.json src/files/after_tree.json

yml-tree:
	npx babel-node src/bin/genDiff.js src/files/before_tree.yml src/files/after_tree.yml

ini-tree:
	npx babel-node src/bin/genDiff.js src/files/before_tree.ini src/files/after_tree.ini

json: 
	npx babel-node src/bin/genDiff.js src/files/before.json src/files/after.json

yml:
	npx babel-node src/bin/genDiff.js src/files/before.yml src/files/after.yml

ini:
	npx babel-node src/bin/genDiff.js src/files/before.ini src/files/after.ini

publish:
	npm publish --dry-run

lint:
	npx eslint ./
