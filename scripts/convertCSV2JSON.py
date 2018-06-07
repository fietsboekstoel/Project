#
# convertcsvtojson.py
#
# Rebecca de Feijter - 10639918
# Project
#
# Converts a csv file to json format.
#
# If csvfile lacks fieldnames, behind 'csvfile' in line 19 add something like:
# , fieldnames = ( "fieldname0","fieldname1","fieldname2","fieldname3" )
#

import csv
import json

# open file to read from and file to write to
# this still has to either loop over all csv's or 1 combined csv
csvfile = open('Movies.csv', 'r')
jsonfile = open('LOTR.json', 'w')

# read csv data into dict
read = csv.DictReader(csvfile)

# turn objects into string
output = json.dumps([row for row in read])

# write json output to jsonfile
jsonfile.write(output)

# close files
csvfile.close()
jsonfile.close()
