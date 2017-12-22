var request = require( 'request' );

module.exports = function( RED ){
  function HashNode( config ){
    RED.nodes.createNode( this, config );

    this.line = config.line;

    var node = this;
    node.on( 'input', function( msg ){
      var line = msg.payload;
      if( !line ){ line = this.line; }
      var url = 'https://www.train-guide.westjr.co.jp/api/v1/' + line + '.json';
      var options = { url: url, method: 'GET' };
      request( options, ( err0, res0, body0 ) => {
        if( err0 ){
          node.send( { payload: { status: false, error: err0 } } );
        }else{
          node.send( { payload: { status: true, body: body0 } } );
        }
      });
    });
  }
  RED.nodes.registerType( "rtpm", HashNode );
}

