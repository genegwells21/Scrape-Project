$.getJSON("/articles", function(data)   {

    for (var i = 0; i < data.length; i++)   {
        $("#articles").append("<p data-id='" + data[i].title + "<br />" + data[i].link + "</p>");
    }
});
$(documment).on("click", "p", function()    {
    $("#notes").empty();
    var thisId=$(this).attr("data-id");

$.ajax({
    method: "GET",
    url: "/articles/" + thisId
})

if (data.note)  {
$("#titleinput").val(data.note.title);
$("#bodyinput").val(data.note.body);
}
});
});
$(document).on("click", "#savenote", function() {
    var thisId = $(this.attr("data-id");
$.axaj({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
        title: $("#titleinput").val(),
        body: $("#bodyinput").val()
}
.done(function(data) {
    console.log(data);
$("#notes").empty();
});

$("#titleinput").val("");
$("#bodyinput").val("");
});