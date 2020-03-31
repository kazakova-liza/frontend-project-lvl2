install:
	npm install

json:
	npx babel-node src/bin/genDiff.js __tests__/__fixtures__/before_tree.json __tests__/__fixtures__/after_tree_.json

yml:
	npx babel-node src/bin/genDiff.js __tests__/__fixtures__/before_tree.yml __tests__/__fixtures__/after_tree_.yml

ini:
	npx babel-node src/bin/genDiff.js __tests__/__fixtures__/before_tree.ini __tests__/__fixtures__/after_tree_.ini

publish:
	npm publish --dry-run

lint:
	npx eslint ./
