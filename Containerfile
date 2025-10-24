FROM cgr.dev/chainguard/python:latest-dev

WORKDIR /app

COPY requirements.txt /app/

VOLUME /app

USER root

RUN apk update \
    && apk upgrade \
    && apk add make \
    && pip install -r requirements.txt

ENTRYPOINT ["make"]
