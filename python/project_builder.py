from PyInquirer import prompt
from pathlib import Path
from progress.bar import Bar
from pyfiglet import Figlet
import os
import shutil
import subprocess
import sys


#################
# - FUNCTIONS - #
#################
def copy_file(blueprint: str, project_name: str):
    shutil.copy(blueprint, './{name}.py'.format(name=project_name))


def insert_name(file_name: str, project_name: str):
    file = Path(file_name)
    try:
        all_text = file.read_text().replace('p_b_template', project_name)
        file.write_text(all_text)
    except OSError:
        print("There was an error reading {file}".format(file=file))


def install_package(message: str, loader_max: int, executable: str):
    bar = Bar(message, max=loader_max)
    for i in range(loader_max):
        os.system(executable)
        bar.next()
    bar.finish()


def makeDir(dir_name: str):
    try:
        os.mkdir(dir_name)
    except OSError:
        print("There was an error creating the {dir} directory".format(
            dir=dir_name))
    else:
        print("Successfully created {dir}".format(dir=dir_name))


figlet = Figlet(font="slant")

print(figlet.renderText('Project Builder'))

questions = [
    {
        'type': 'list',
        'name': 'language',
        'message': 'Which Language will this be in?',
        'choices': ['JavaScript', 'TypeScript', 'Rust', 'Python']
    },
    {
        'type': 'input',
        'name': 'name',
        'message': 'Projects Name?',
        'when': lambda answers: answers['language'] == 'Python'
    },
    {
        'type': 'list',
        'name': 'javascript_type',
        'message': 'Vanilla F/E, React or Node?',
        'choices': ['Vanilla F/E', 'Pug', 'React', 'Node'],
        'when': lambda answers: answers['language'] == 'TypeScript' or 'JavaScript'
    },
    {
        'type': 'list',
        'name': 'css',
        'message': 'How do you want your CSS?',
        'choices': ['SCSS', 'styled-components'],
        'when': lambda answers: answers['javascript_type'] == 'React'
    },
    {
        'type': 'list',
        'name': 'express',
        'message': 'Express?',
        'choices': ['Ya', 'Nah'],
        'when': lambda answers: answers['javascript_type'] == 'Node'
    },

]
answers = prompt(questions)


makeDir(answers['name'].strip())

if answers['language'] == 'Python':
    os.chdir(answers['name'])
    install_package('Creating a venv...', 1, 'python3 -m venv ./')
    print("\n")
    copy_file(
        '/Users/patrickmclennan/Documents/project_builder/blueprints/blueprint_python.py', answers['name'])
    os.system('source bin/activate')
    os.system('python3 ./{file}.py'.format(file=answers['name']))
