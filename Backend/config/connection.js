const MongoClient = require('mongodb').MongoClient;
const ObjectId    = require('mongodb').ObjectId;

const url = 'mongodb://localhost:27017';

const dbName = 'calculadoradb';

var  commandType = {

    INSERT:1,
    INSERTMANY:2,
    FIND:3,
    DELETEONE:4,
    UPDATEONE:5,
    FINDALL:6,
    DELETEONEBYID:7,
    UPDATEONEBYID:8,
    DELETEMANY:9,
    UPDATEMANY:10

};


module.exports.insert = function(documentValue, collectionName, callbackResult){


    executeCommands(commandType.INSERT, documentValue, collectionName, callbackResult, null);
}



function executeCommands(commandTypeEnum, documentValue, collectionName, callbackResult, keyForUpdateOrDelete){

    //connnection mongodb
    MongoClient.connect(url,  { useNewUrlParser: true },function(error, client) {

        try {
         
            
            //set database
            var db = client.db(dbName);

        } catch (error) {

            callbackResult(error, null);
        }

        //set collection
        var collection = db.collection(collectionName);


        //execute commands in collection
        if(commandTypeEnum === commandType.INSERT){
           
            collection.insertOne(documentValue, function(error, result){
            
                callbackResult(error, result);

            });

        }
        else if(commandTypeEnum === commandType.INSERTMANY){
  
            collection.insertMany(documentValue, function(error, result){
                
                callbackResult(error, result);


            });

        }
        else if(commandTypeEnum === commandType.FIND || commandTypeEnum === commandType.FINDALL){
            
            collection.find(documentValue).toArray(function(error, result) {
            
                callbackResult(error, result);

            });
  
        }
        else if(commandTypeEnum === commandType.UPDATEONE || commandTypeEnum === commandType.UPDATEONEBYID){

            
            collection.updateOne(keyForUpdateOrDelete, { $set: documentValue }, function(error, result) {
           
                callbackResult(error, result);
            });
            

        }
        else if(commandTypeEnum === commandType.UPDATEMANY){

            
            collection.updateMany(keyForUpdateOrDelete, { $set: documentValue }, function(error, result) {
           
                callbackResult(error, result);
            });
            

        }
        else if(commandTypeEnum === commandType.DELETEONE || commandTypeEnum === commandType.DELETEONEBYID){
          
         
            collection.deleteOne(keyForUpdateOrDelete, function(error, result) {
           
                callbackResult(error, result);
            });
            

        }
        else if(commandTypeEnum === commandType.DELETEMANY){
        
            collection.deleteMany(keyForUpdateOrDelete, function(error, result) {
           
                callbackResult(error, result);
            });
            

        }

       
        client.close();

    });
}