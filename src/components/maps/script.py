import json

def main():

	with open("r12.json", "r") as read_file:
    	data = json.load(read_file)

    	print(data)