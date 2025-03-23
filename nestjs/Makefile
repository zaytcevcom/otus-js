.PHONY: test

init: init-ci ready
init-ci: docker-down-clear \
	clear \
	docker-pull docker-build docker-up \
	npm-install \
#	wait-db migration-run

up: docker-up
down: docker-down
restart: down up
check: lint


#Docker
docker-up:
	docker compose up -d

docker-down:
	docker compose down --remove-orphans

docker-down-clear:
	docker compose down -v --remove-orphans

docker-pull:
	docker compose pull

docker-build:
	docker compose build --pull

clear:
	docker run --rm -v ${PWD}:/app -w /app alpine sh -c 'rm -rf .ready build'


npm-install:
	docker compose run -u root --rm node-cli npm ci

ready:
	docker run --rm -v ${PWD}:/app -w /app alpine touch .ready


lint:
	docker compose run --rm node-cli npm run lint

test:
	docker compose run --rm node-cli npm run test


#Migrations
wait-db:
	docker compose run --rm node-cli wait-for-it postgres:5432 -t 30

migration-generate:
	docker compose run --rm node-cli npm run migration:generate -- src/migrations/migration

migration-run:
	docker compose run --rm node-cli npm run migration:run

migration-revert:
	docker compose run --rm node-cli npm run migration:revert

migration-create:
	docker compose run --rm node-cli npm run migration:create


#Build
build-project:
	docker --log-level=debug build --pull --file=./docker/production/nginx/Dockerfile --tag=${REGISTRY}/nest-js:${IMAGE_TAG} .

push:
	docker push ${REGISTRY}/nest-js:${IMAGE_TAG}
