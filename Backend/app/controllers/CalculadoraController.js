calc = requires("./domains/Calculadora")
module.exports = function(app){

    
    var calculadoraRepository = new app.app.repositorys.CalculadoraRepository();

    app.post("/calculadora",function(req,res){


        calc.depositoInicial = 0;

        var calculadora = req.body;

        calculadoraRepository.save(calculadora,function(error, result){
            
            var resultClient = new Object();
            
            if(error != null){
             
                resultClient.code = 0;
                resultClient.message = "Error while save one new record!";
                resultClient.details = error;
                
            }
            else{

                resultClient.code = 1;
                resultClient.message = "Record saved successfully!";
            
            }

            res.send(resultClient);
            
        });

    });

}
