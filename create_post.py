#!/usr/bin/env python3

from jinja2 import Environment, FileSystemLoader
from datetime import datetime
import inquirer
from slugify import slugify

current_datetime = datetime.now()

date = current_datetime.strftime("%Y-%m-%d")

questions = [
    inquirer.Text("title", message="What is the name of the article?"),
    inquirer.Text("description", message="In summary, what is the article about?"),
    inquirer.List("category", message="What Category is the article?", choices=["Programming", "IT", "Music", "Gaming"]),
    inquirer.Text("tags", message="Please enter a comma separated list of tags")
]

answers = inquirer.prompt(questions)

environment = Environment(loader=FileSystemLoader("templates/"))
template = environment.get_template("standard_post_template.md")

content = template.render(
    title=answers['title'],
    date=date,
    category=answers['category'],
    tags=answers['tags'],
    description=answers['description']
)
filepath = "./content/posts/" + slugify(answers['title']) + ".md"
with open(filepath, mode="w", encoding="utf-8") as post:
    post.write(content)
    print(f"Created {filepath}" )

