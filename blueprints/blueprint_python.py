import sys


def hello_world():
    print("Thanks for using Project Builder.  {project} looks ready to go. \n A venv has been made and activated. \n Have at 'er. \n".format(
        project=sys.argv[0]))


hello_world()
