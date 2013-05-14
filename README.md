bikerackfinder
==============

Find bike racks near you or an address.

For development:

you will need...

node
mongodb
npm (which might get installed with node by default)
git

you'll need to start your mongodb server...
the first time you'll set it up you'll want to run dbinit.sh...
dbinit.sh will take the city data in csv format and pipe it into mongodb...
the data will become BSON...
it will set the data up for the geospatial index, which will create a speedy search for bike rack locations near your location.

With node, we're using the Express, which is a web application framework.

Express is good for allowing you to set up static HTTP requests, or allow for dynamic requests which can be dynamically changed with a combination of query string parameters and request types.

We're using Mongoose as our ODM.  This will map documents in the db to objects in the javascript.


