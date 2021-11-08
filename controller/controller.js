const router = require('express').Router();
var User =require('../models/user')


router.get('/',   (req, res) => {

    res.render("home", {
        viewTitle: "Insert Employee"
    });
});

router.post('/' ,(req, res) => {

        insertRecord(req, res);
        
});


function insertRecord(req, res) {

    var user = new User();

     
    user.name = req.body.name;
    user.username = req.body.username;
    user.password  = req.body.password
    
    user.save(function(err, doc) {
        if (!err){

            res.redirect('/list');
        }
        else { 
    
          console.log(err)
        }
    });
  }


router.get('/list', (req, res) => {
    console.log("heree")
    User.find({},(err, docs) => {
        if (!err) {
            
            res.render("list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});





router.get('/edit/:id', (req, res) => {
    User.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("edit", {
                viewTitle: "Update Employee",
                user: doc

            });
        }
        else
        console.log('There is error in Editing Rquest data' + err) 
    });
});

router.post('/edit/:id', (req , res) => {


    User.findByIdAndUpdate(req.params.id, {$set:{name:req.body.fullname , username:req.body.email}}, function  (err , obj) {
        if(err){
          console.log(err , 'error_msg', 'Something went wrong! User could not updated.');
          
      } else {
        console.log('success_msg', 'Record Updated');
        res.redirect('/list');
      }
      });
})


router.get('/delete/:id', (req, res) => {
        User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/list');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});



module.exports = router;