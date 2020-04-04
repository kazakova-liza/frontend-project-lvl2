install:
	npm install

json:
	npx babel-node src/bin/genDiff.js --format=json __tests__/__fixtures__/before_tree.json __tests__/__fixtures__/after_tree.json

plain:
	npx babel-node src/bin/genDiff.js --format=plain __tests__/__fixtures__/before_tree.json __tests__/__fixtures__/empty.json

tree:
	npx babel-node src/bin/genDiff.js --format=tree __tests__/__fixtures__/before_tree.json __tests__/__fixtures__/after_tree.json

publish:
	npm publish --dry-run

lint:
	npx eslint ./
