var express = require('express');
var router = express.Router();
var puppyArray = [];

router.get('/', function(req, res, next) {
  res.render('puppy-form', {
      title: 'Add Puppies',
      columnHeader1: "Puppy Name:",
      columnHeader2: "Puppy ID:"
  });
});

router.post('/submit', function(req, res, next){
  var puppyInputName = req.body.puppyName;
  var puppyInputID = req.body.puppyID;
  var errors =  puppyValidationCheck(puppyInputName, puppyInputID);

  if (errors.length > 0){
    res.render('puppy-form', {
      title: 'Add Puppies',
      columnHeader1: "Puppy Name:",
      columnHeader2: "Puppy ID:",
      errors: errors
    });

  }else{
    puppyArray.push({
      name: req.body.puppyName,
      id: req.body.puppyID
    });
    res.render("index",{
      title: "New Puppies",
      array: puppyArray,
      columnHeader1: "Puppy Name:",
      columnHeader2: "Puppy ID:",
      success: "Yay! You just added a new Puppy"
    });
  }
});
function puppyValidationCheck(puppyName, puppyID) {

  var errorArray = [];
  var puppyNameTrimmed = puppyName.trim();
  var puppyIDTrimmed = puppyID.trim();
  // puppy name validations
  if(puppyNameTrimmed === '') {
    errorArray.push("Name cannot be blank.");
  }

  // puppy ID validations
  if(puppyIDTrimmed === '') {
    errorArray.push('ID cannot be blank.');
  } else if (puppyIDTrimmed.length < 3) {
    errorArray.push('A ID must be at least 3 characters long.');
  }
  for (var i = 0; i < puppyArray.length; i++) {
    console.log(puppyArray[i]);
    if (puppyIDTrimmed === puppyArray[i].id){
      errorArray.push('That ID already exists.');
    }
  }
  return errorArray;

}
module.exports = router;
// JSON.stringify(
