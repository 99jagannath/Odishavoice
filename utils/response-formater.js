var getResponse = function(_status, _message, _content){
    var status = 'success';
    if(!_status){
        status = 'failure';
    }
    return {'status':status, 'message':_message, 'content':_content};
};
 
var getFailureResponse = function(_message) {
    return {'status':'failure', 'message':_message, 'content': {}};
}
 
var getSuccessResponse = function(_content) {
    return {'status':'success', 'message':"Request completed successfully", 'content': _content};
}
 
var getSuccessMessage = function(_message) {
    return {'status':'success', 'message': _message, 'content': {}};
}
 
var getSuccessMessageContent = function(_message, _content) {
    return {'status':'success', 'message': _message, 'content': _content};
}
 
module.exports.get = getResponse;
module.exports.failure = getFailureResponse;
module.exports.success = getSuccessResponse;
module.exports.successMsg = getSuccessMessage;
module.exports.successMsgData = getSuccessMessageContent;