const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const morgan = require( 'morgan' );
const helmet = require( 'helmet' );
const uuid = require( 'uuid/v4' );
const {passport} = require( './auth' );
const generateUid = require( './uid' );
const XLSX = require('xlsx');

const app = express();
app.enable( 'trust proxy' ); // https://expressjs.com/en/guide/behind-proxies.html
app.use( bodyParser.urlencoded( {extended: false} ) );
app.use( bodyParser.json() );
app.use( morgan( 'common' ) );
app.use( helmet() );
app.use( passport.initialize() );

const workbook = XLSX.readFile('dataElements.xlsx');
const sheet = XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[0]] );

const database = {};









app.get( '/', passport.authenticate( 'basic', {session: false} ), (req, res) => {
  res.json( {
    status: 'OK',
    data: Object.values( database )
  } )
} );

app.get( '/:id', passport.authenticate( 'basic', {session: false} ), (req, res) => {
  if ( !database[req.params.id] ) {
    res.statusCode = 404;
    return res.end();
  }

  res.json( database[req.params.id] );
} );

/*app.post( '/', (req, res) => {
	let id = uuid();

	if ( req.body['__id'] ) {
		id = req.body['__id']; // TODO validate uuid
	}

	database[id] = {__id: id, ...req.body};

	res.header( 'Location', id );

	res.json( {
		status: 'OK'
	} )
} );*/

sheet.forEach( dataElement => {
	let id = generateUid();
	database[id] = {id: id, ...dataElement};
});









app.listen( 8080, '127.0.0.1', () => {
  console.info( 'Started server' );
} );