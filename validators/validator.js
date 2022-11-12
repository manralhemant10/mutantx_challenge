const emailValidator = (email)=>{
	 const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
	 return new Promise((resolve)=>{
	 	if(pattern.test(email)){
	 		resolve(true)
	 	}
	 	else{
	 		throw new Error("Invalid Email")
	 	} 
	 })

}

module.exports = {
	emailValidator
}