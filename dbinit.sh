#! /bin/bash

mongoimport --db rackdata --collection chicago --type csv --headerline --file osd-bike-racks/data/Bike_Racks.csv

mongo dataclean.js
