function validateCity(data) {
    if(!data.length){
        return false;
    }
    return true;
}
module.exports = {validateCity}