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
csvfile = open('allextravariables.csv', 'r')
jsonfile = open('allextravariables.json', 'w')

# read csv data into dict
read = csv.DictReader(csvfile)

# turn objects into string
output = json.dumps([row for row in read])

# write json output to jsonfile
jsonfile.write(output)

# close files
csvfile.close()
jsonfile.close()


csvfile2 = open('allfootprintdataadjusted.csv', 'r')
jsonfile2 = open('footprintdetails.json', 'w')
read2 = csv.DictReader(csvfile2)
output2 = json.dumps([row for row in read2])
jsonfile2.write(output2)
csvfile2.close()
jsonfile2.close()

csvfile3 = open('globalisationindex.csv', 'r')
jsonfile3 = open('globalisationindex.json', 'w')
read3 = csv.DictReader(csvfile3)
output3 = json.dumps([row for row in read3])
jsonfile3.write(output3)
csvfile3.close()
jsonfile3.close()

csvfile4 = open('countryandcode.csv', 'r')
jsonfile4 = open('countryandcode.json', 'w')
read4 = csv.DictReader(csvfile4)
output4 = json.dumps([row for row in read4])
jsonfile4.write(output4)
csvfile4.close()
jsonfile4.close()
