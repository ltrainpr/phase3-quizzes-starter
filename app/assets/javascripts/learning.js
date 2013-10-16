var append = function(response) {
  $('.container').append(response.id).html(response.name)
}

function getQuestion(){
  localStorage["session_key"] = makeid()
  $.getJSON("/quizzes/1/questions/next.json", localStorage, function(value){
      displayQuestion(value)
  })
}


function displayAnswers(value){
    $.each(value.choices, function(index, choice){
      $('.container').append("<p> " + choice.choice + " </p>")
  })
}

function displayQuestion(value){
    var question = value.question
    $('.container').append("<h2>" + question + "</h2>")
    displayAnswers(value)
}

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
};

$(function() {
  $.getJSON("/quizzes.json", function(response){
   $.each(response.quizzes, function(index, quiz) {
     append(quiz)
   })
  })
  $('.container').on('click', getQuestion)
})
