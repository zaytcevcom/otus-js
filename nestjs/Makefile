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
	docker --log-level=debug build --pull --file=./docker/production/node/Dockerfile --tag=${REGISTRY}/nest-js:${IMAGE_TAG} .

push:
	docker push ${REGISTRY}/nest-js:${IMAGE_TAG}


deploy:
	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'docker login -u=${DOCKERHUB_USER} -p=${DOCKERHUB_PASSWORD} ${REGISTRY}'
	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'rm -rf ${PROJECT_NAME}/v_${BUILD_NUMBER}'
	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'mkdir -p ${PROJECT_NAME}/v_${BUILD_NUMBER}'

	scp -o StrictHostKeyChecking=no -P ${PORT} docker-compose-production.yml deploy@${HOST}:${PROJECT_NAME}/v_${BUILD_NUMBER}/docker-compose.yml
	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'cd ${PROJECT_NAME}/v_${BUILD_NUMBER} && echo "COMPOSE_PROJECT_NAME=nest-js" >> .env'
	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'cd ${PROJECT_NAME}/v_${BUILD_NUMBER} && echo "REGISTRY=${REGISTRY}" >> .env'
	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'cd ${PROJECT_NAME}/v_${BUILD_NUMBER} && echo "IMAGE_TAG=${IMAGE_TAG}" >> .env'
	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'cd ${PROJECT_NAME}/v_${BUILD_NUMBER} && echo "DOMAIN=${DOMAIN}" >> .env'
	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'cd ${PROJECT_NAME}/v_${BUILD_NUMBER} && echo "JWT_SECRET=${JWT_SECRET}" >> .env'
	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'cd ${PROJECT_NAME}/v_${BUILD_NUMBER} && echo "JWT_EXPIRES_IN=${JWT_EXPIRES_IN}" >> .env'
	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'cd ${PROJECT_NAME}/v_${BUILD_NUMBER} && echo "DB_HOST=${DB_HOST}" >> .env'
	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'cd ${PROJECT_NAME}/v_${BUILD_NUMBER} && echo "DB_PORT=${DB_PORT}" >> .env'
	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'cd ${PROJECT_NAME}/v_${BUILD_NUMBER} && echo "DB_USERNAME=${DB_USERNAME}" >> .env'
	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'cd ${PROJECT_NAME}/v_${BUILD_NUMBER} && echo "DB_PASSWORD=${DB_PASSWORD}" >> .env'
	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'cd ${PROJECT_NAME}/v_${BUILD_NUMBER} && echo "DB_DATABASE=${DB_DATABASE}" >> .env'
	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'cd ${PROJECT_NAME}/v_${BUILD_NUMBER} && echo "DB_SYNCHRONIZE=${DB_SYNCHRONIZE}" >> .env'

	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'cd ${PROJECT_NAME}/v_${BUILD_NUMBER} && docker compose pull'
	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'cd ${PROJECT_NAME}/v_${BUILD_NUMBER} && docker compose up --build --remove-orphans -d'
	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'rm -f ${PROJECT_NAME}/${PROJECT_NAME}'
	ssh -o StrictHostKeyChecking=no deploy@${HOST} -p ${PORT} 'ln -sr ${PROJECT_NAME}/v_${BUILD_NUMBER} ${PROJECT_NAME}/${PROJECT_NAME}'
