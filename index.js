#!/usr/bin/env node

const program = require( 'commander' );
const fetch = require( "node-fetch" );
//const generateUid = require( './uid' );

program.version( '0.1.0' )
  .description( 'Integrate metadata between systems' )
  .option( '--source [source]', 'URL of source', 'http://localhost:8080' )
  .option( '--sourceUsername [sourceUsername]', 'username of source', 'admin' )
  .option( '--sourcePassword [sourcePassword]', 'password of source', 'admin' )
  .option( '--target [target]', 'URL of target', 'http://localhost:8080' )
  .option( '--targetUsername [targetUsername]', 'username of target', 'admin' )
  .option( '--targetPassword [targetPassword]', 'password of target', 'admin' );

program.parse( process.argv );

const createAuthenticationHeader = (username, password) => {
  return "Basic " + new Buffer( username + ":" + password ).toString( "base64" );
};

/*fetch(
  program.source,
  {
    headers: {
      Authorization: createAuthenticationHeader( program.sourceUsername, program.sourcePassword )
    }
  }
)
  .then( result => result.json() )
  .then( data => console.log( data.dataElements[0].displayName ) );

fetch(
  program.target,
  {
    headers: {
      Authorization: createAuthenticationHeader( program.targetUsername, program.targetPassword )
    }
  }
)
  .then( result => result.json() )
  .then( data => console.log( data.dataElements[0].displayName ) );*/

const doWork = async () => {
  /*const results = [];
  results.push( await calculate( 1, 1 ) );
  results.push( await calculate( 2, 2 ) );

  results.push( await Promise.all( [
    calculate( 3, 3 ),
    calculate( 4, 4 ),
    calculate( 5, 5 )
  ] ) );

  results.push( await calculate( 6, 6 ) );
  results.push( await calculate( 7, 7 ) );

  return results;*/

  const res = await fetch(program.source,
  {
    headers: {
      Authorization: createAuthenticationHeader( program.sourceUsername, program.sourcePassword )
    }
  });
  const json = await res.json();

  json.data.map( de => {
    de["categoryCombo"]={"id":"TiHjDIadDIL"};
    return de;
  });
  //console.log({"dataElements":json.data});

  //console.log(json);

  let resTarget = await fetch(program.target,
  {
    "method": "POST",
    "headers": {
       "Authorization": createAuthenticationHeader( program.targetUsername, program.targetPassword ),
       "Content-Type": "application/json"
    },
    "body": JSON.stringify({dataElements:json.data}) //JSON.stringify(payload)
  });
  targetJson = await resTarget.json();
  //console.log(JSON.stringify({dataElements:json.data}));
  console.log( targetJson );
  //await console.log(resTarget);
  //const json = await res.json();

  //json.map();



};

(async () => {
  const r = await doWork();
  //console.log( r );
})();

/*const output = [];

for ( let i = 0; i < program.limit; i++ ) {
  output.push( generateUid() );
}

if ( program.json ) {
  console.log( JSON.stringify( {codes: output} ) );
} else if ( program.csv ) {
  console.log( 'codes' );
  output.forEach( c => console.log( c ) );
} else {
  console.log( output.join( ' ' ) );
}*/


/*
	--source http://localhost:8080
    --source-username username
    --source-password password
    --target https://play.dhis2.org/dev/api/dataElement
    --target-username username
    --target-password password
*/