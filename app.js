
var app = require("./config/config");
 
//port for server
var port = 30010;


//starting server
app.listen(port, function(){
    
    console.log("Servidor iniciado na porta: " + port);

});

