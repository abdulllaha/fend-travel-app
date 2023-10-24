// validate data retrived from geo location
function validateCity(data) {
    if(!data.length){
        return false;
    }
    return true;
}
module.exports = {validateCity}