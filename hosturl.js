hosturl = "95.216.71.108"
// hosturl = "localhost"
 $('input[Type="Number"]').keypress(function (e) {
    if ('0123456789'.indexOf(e.key) == -1) {
        e.preventDefault();
    }
});
