//token for id:1
var token = 'eyJpZCI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMSJ9=';
//users 1 through 5

function sendXHR(verb, resource, body, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open(verb, resource);
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    // The below comment tells ESLint that AppError is a global.
    // Otherwise, ESLint would complain about it! (See what happens in Atom if
    // you remove the comment...)
    // global AppError //
    // Response received from server. It could be a failure, though!
    xhr.addEventListener('load', function() {
        var statusCode = xhr.status;
        var statusText = xhr.statusText;
        if (statusCode >= 200 && statusCode < 300) {
            // Success: Status code is in the [200, 300) range.
            // Call the callback with the final XHR object.
            cb(xhr);
        } else {
            // Client or server error.
            // The server may have included some response text with details concerning
            // the error.
            var responseText = xhr.responseText;
            window.AppError('Could not ' + verb + " " + resource + ": Received " +
                statusCode + " " + statusText + ": " + responseText);
        }
    });
    // Time out the request if it takes longer than 10,000
    // milliseconds (10 seconds)
    xhr.timeout = 10000;
    // Network failure: Could not connect to server.
    xhr.addEventListener('error', function() {
        window.AppError('Could not ' + verb + " " + resource +
            ": Could not connect to the server.");
    });
    // Network failure: request took too long to complete.
    xhr.addEventListener('timeout', function() {
        window.AppError('Could not ' + verb + " " + resource +
            ": Request timed out.");
    });
    switch (typeof(body)) {
        case 'undefined':
            // No body to send.
            xhr.send();
            break;
        case 'string':
            // Tell the server we are sending text.
            xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
            xhr.send(body);
            break;
        case 'object':
            // Tell the server we are sending JSON.
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            // Convert body into a JSON string.
            xhr.send(JSON.stringify(body));
            break;
        default:
            throw new Error('Unknown body type: ' + typeof(body));
    }
}

export function postImg(file){
  console.log(file);
  var formData = new FormData();
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/photo');
  formData.append("img", file);
  xhr.send(formData); 
}

export function postCard(body) {
  //console.log(JSON.stringify(body));
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/postcard');
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  // Convert body into a JSON string.
  xhr.send(JSON.stringify(body));
}

export function getCardInfo(id, cb){
  sendXHR('GET','/card/' + id, undefined,(xhr)=>{
    cb(JSON.parse(xhr.responseText));
  })
}

