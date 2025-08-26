# falapovo-mobile-backend

# CONFIGURAÇÕES BANCO DE DADOS

docker name: falapovo-mobile

POSTGRES_USER=postgres  

POSTGRES_PASSWORD=123456 

POSTGRES_DB=falapovo_db 

Porta: 5434:5432

docker run --name falapovo-mobile
  -e POSTGRES_USER=postgres
  -e POSTGRES_PASSWORD=123456
  -e POSTGRES_DB=falapovo_db
  -p 5434:5432
  -v falapovo-mobile_pgdata:/var/lib/postgresql/data
  -d postgres