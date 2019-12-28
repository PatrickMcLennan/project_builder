from pyfiglet import Figlet
from PyInquirer import prompt
from pprint import pprint

figlet = Figlet(font="slant")

print(figlet.renderText('Project Builder'))


def styling(answer):
    return ['CSS', 'SCSS', 'styled-compomnents'] if answers == 'React' else ['CSS', 'SCSS']


questions = [
    {
        'type': 'list',
        'name': 'language',
        'message': 'Which Language will this be in?',
        'choices': ['JavaScript', 'TypeScript', 'Rust', 'Python']
    },
    {
        'type': 'list',
        'name': 'javascript_type',
        'message': 'Vanilla F/E, React or Node?',
        'choices': ['Vanilla F/E', 'React', 'Node'],
        'when': lambda answers: answers['language'] == 'TypeScript' or 'JavaScript'
    },
    {
        'type': 'list',
        'name': 'css',
        'message': 'How do you want your CSS?',
        'choices': styling(lambda answers: answers['javascript_type']),
        'when': lambda answers: answers['javascript_type'] == 'Vanilla F/E' or 'React'
    },
    {
        'type': 'list',
        'name': 'express',
        'message': 'Express?',
        'choices': ['Ya', 'Nah'],
        'when': lambda answers: answers['javascript_type'] == 'Node'
    }
]


answers = prompt(questions)

pprint(answers)
