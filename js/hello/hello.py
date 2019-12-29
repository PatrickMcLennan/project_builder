import sys


def hello_world():
    print('Thanks for using Project Builder.  {project} looks ready to go.'.format(
        project=sys.argv[0]))
    print("\n")
    print("A venv has been made and activated for you.")
    print("\n")
    print("Have at 'er.")
    print("\n")


hello_world()
