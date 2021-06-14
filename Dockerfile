# syntax=docker/dockerfile:1
FROM postgres:latest
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD goal-pools-rule
ENV POSTGRES_DB goal-pool

COPY init-db.sql /docker-entrypoint-initdb.d/