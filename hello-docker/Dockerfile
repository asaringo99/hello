# syntax=docker/dockerfile:1

FROM python:3.8-slim-buster

WORKDIR /app

COPY . .

ENTRYPOINT [ "python3" , "test.py"]
CMD [ "python3" , "test2.py"]