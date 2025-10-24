PY?=
PELICAN?=pelican
PELICANOPTS=

BASEDIR=$(CURDIR)
INPUTDIR=$(BASEDIR)/content
OUTPUTDIR=$(BASEDIR)/output
PUBLISHDIR=$(BASEDIR)/docs
CONFFILE=$(BASEDIR)/pelicanconf.py
PUBLISHCONF=$(BASEDIR)/publishconf.py

CNAME=yuceltoluyag.dev

DEBUG ?= 0
ifeq ($(DEBUG), 1)
	PELICANOPTS += -D
endif

help:
	@echo 'Makefile for a pelican Web site and podman commands                       '
	@echo '                                                                          '
	@echo 'Usage (Outside the Container):                                            '
	@echo '   make build                          builds a dev container             '
	@echo '   make clean                          remove the generated files         '
	@echo '   make post                           create post using container        '
	@echo '   make run                            runs a dev container               '
	@echo '                                                                          '
	@echo 'Usage (Inside the Container):                                             '
	@echo '   make create-post                    creates a new post using template  '
	@echo '   make devserver [PORT=8000]          serve and regenerate together      '
	@echo '   make publish-docs                   generate using production settings '
	@echo '                                                                          '
	@echo 'Set the DEBUG variable to 1 to enable debugging, e.g. make DEBUG=1 html   '
	@echo 'Set the RELATIVE variable to 1 to enable relative urls                    '
	@echo '                                                                          '

build:
	podman build -t yuceltoluyag.dev:latest .

build-docker:
	docker build -f Containerfile -t yuceltoluyag.dev:latest .

clean:
	[ ! -d "$(OUTPUTDIR)" ] || rm -rf "$(OUTPUTDIR)"

post:
	podman run --rm -it --volume .:/app:Z -p 8000:8000 yuceltoluyag.dev:latest create-post

post-docker:
	docker run --rm -it --volume .:/app -p 8000:8000 yuceltoluyag.dev:latest create-post

run:
	podman run --rm -it --volume .:/app:Z -p 8000:8000 yuceltoluyag.dev:latest devserver

run-docker:
	docker run --rm -it --volume .:/app -p 8000:8000 yuceltoluyag.dev:latest devserver

create-post:
	python create_post.py

devserver:
	"$(PELICAN)" -lr "$(INPUTDIR)" -o "$(OUTPUTDIR)" -s "$(CONFFILE)" -b 0.0.0.0 $(PELICANOPTS)
	echo $(CNAME) > "$(OUTPUTDIR)/CNAME"

.PHONY: build clean post publish run create-post devserver publish-docs
