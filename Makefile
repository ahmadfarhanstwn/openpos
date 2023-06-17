build:
	docker-compose build --no-cache --force-rm
stop:
	docker-compose stop
up:
	docker-compose up -d
migrate:
	docker exec server bash -c "php artisan migrate"