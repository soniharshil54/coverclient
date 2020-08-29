

hosturl = "161.97.102.232"

 $('input[Type="Number"]').keypress(function (e) {
    if ('0123456789'.indexOf(e.key) == -1) {
        e.preventDefault();
    }
});


// hosturl = "localhost"

