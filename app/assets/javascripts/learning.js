var append = function(quiz) {
  var $quizHeader = $("<h1>"+quiz.name+"</h1>");
  $quizHeader.on('click', getQuestion)
  $('.container').html($quizHeader)
}
function getQuestion(){
  $.get("/quizzes/1/questions/next.json", {session_key: localStorage.session_key}, function(value){
      displayQuestion(value)
  })
}

function displayAnswers(value){
  $.each(value.choices, function(index, choice){
    var choiceHtml = "<p data-id="+(index+1).toString()+ " >" + choice.choice + " </p>";
    var $choice = $(choiceHtml);
    $choice.on("click", answerChosen)
    $('.container').append($choice)
  })
  //answerChosen()
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

function answerChosen(e) {
  var choiceId = $(this).data("id");
  console.log(localStorage)
  //localStorage["choice_id"] = response.id
  $.post("/questions/1/answers.json", { session_key: localStorage.session_key, choice_id: choiceId }, function(response) {
    console.log(response)
    checkAnswer(response)
  })
}

function checkAnswer(response) {
  alert(response.correct)
  amountCorrect(response)
}

var correct = []
var incorrect = []
function amountCorrect(response) {
  if response.correct == "false" {
    correct.push(response.id)
  }else{
    incorrect.push(response.id)
  }

}


$(function() {
  localStorage.session_key = makeid();
  $.get("/quizzes.json", function(response){
   $.each(response.quizzes, function(index, quiz) {
     append(quiz)
   })
  })
})
