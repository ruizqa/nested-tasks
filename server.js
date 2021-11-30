const express = require( 'express' );
const {TaskRouter} = require( './server/config/router' );
require( './server/config/mongoose' );
const app = express();
const cors = require('cors')
app.use(cors());
app.use(express.json());
app.use( express.urlencoded({extended:true}) );
app.use( '/', TaskRouter );


app.listen( 8888, function(){
    console.log( "The server is running in port 8888." );
});