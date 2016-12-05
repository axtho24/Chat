! function (){
function addToList(item) {
    var out = document.getElementById("holder");
    var isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop + 1;
    var $li = $("<li><button>x</button></li>")
    $li.append(`${item.username}: ${item.text}`)
    $("ul").append($li)
    if (isScrolledToBottom)
        out.scrollTop = out.scrollHeight - out.clientHeight;
}

var lastMessageId
$.get("http://tiy-orl-proxy.herokuapp.com/messages")
    .then(function(response) {
        var items = response.messages
        items.forEach(addToList)
        var lastMessages = response.messages[response.messages.length - 1]
        lastMessageId = lastMessage.id
    })

var out = document.getElementById("holder");
setInterval(function moreMessages() {
    $.get(`http://tiy-orl-proxy.herokuapp.com/messages?min=${lastMessageId}`)
        .then(function(response) {
            var items = response.messages
            items.forEach(addToList)
        })
}, 5000)

$("form").submit(function(event) {
    event.preventDefault()
    var theName = $('#input1').val()
    var theText = $('#input2').val()
    $.post("http://tiy-orl-proxy.herokuapp.com/messages", {
            message: {
                username: theName,
                text: theText
            }
        })
        .then(response => {
            $('#input2').val('')
            addToList2(response)
        })
})

function addToList2(item) {
    var $li = $("<li><button>x</button>")
    console.log($li)
    $li.append(`${item.message.username}: ${item.message.text}`)
    $("ul").append($li)
}

$("#input1").val(getSavedValue("input1"));

function saveValue(e) {
    var id = e.id;
    var val = e.value;
    localStorage.setItem(id, val);
}

function getSavedValue(v) {
    if (localStorage.getItem(v) === null) {
        return "";
    }
    return localStorage.getItem(v);
}
}()
