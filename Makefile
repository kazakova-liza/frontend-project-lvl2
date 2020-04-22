install:
	npm install

json:
	npx babel-node src/bin/genDiff.js --format=json __tests__/__fixtures__/input_files/before.json __tests__/__fixtures__/input_files/after.json

plain:
	npx babel-node src/bin/genDiff.js --format=plain __tests__/__fixtures__/input_files/before.json __tests__/__fixtures__/input_files/after.json

tree:
	npx babel-node src/bin/genDiff.js --format=tree __tests__/__fixtures__/input_files/before.json __tests__/__fixtures__/input_files/after.json

publish:
	npm publish --dry-run

lint:
	npx eslint ./
