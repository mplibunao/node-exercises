var fs = require('fs');

/*
fs.readFile('readme.txt', 'utf8', function(err, msg){
  console.log(msg);
  fs.writeFileSync('writeme.txt', msg);
});
*/

fs.mkdir('stuff', function(){
  fs.readFile('readMe.txt', 'utf8', function(err, data){
    fs.writeFile('./stuff/writeMe.txt', data, function(){
      console.log('Successfuly written in ./stuff/writeMe.txt');
    });
  });
});


fs.unlink('./stuff/writeMe.txt', function(){
  fs.rmdir('stuff', function(){
      console.log('successfully deleted .stuff/writeme.txt')
  });

});
