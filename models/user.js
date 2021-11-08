var mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');

var userSchema = new Schema({
  
    name:{
    type:String,
    required : 'This field is required'
  },
  username:
  {
    type:String,
    unique:true,
    required:true
  },
  password:
  {
      type:String,
      minlength:6,
      required:true
  }

});



userSchema.pre("save" ,  async function(next)
{

  if(this.isModified("password")){
  try{

    
    this.password = bcrypt.hashSync(this.password, 10);

    next();

  }
  catch(e)
  {
    return e;
  }

}
})


module.exports = mongoose.model('User', userSchema);