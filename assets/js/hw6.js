var topics = [
    'Squirrels', 'Rocky', 'Rambo', 'Commando', 'Quicksilver',
    'Horrible Bosses', 'Bruce Almighty', 'Noah', 'Spiderman', 'Iron Man',
    'X-Men', 'The Shining', 'Donnie Darko', 'The Shawshank Redemption', 'Uncle Buck'
]

var gifyKey = '52f7d275dc8d4ff685cab3a5ce0baca0'
function handleButtonClick(buttonTopic){

    $('#images').html("")

    var xhr = $.get("http://api.giphy.com/v1/gifs/search?q="+buttonTopic+"&api_key="+gifyKey+"&limit=10&rating=g");
    xhr.done(
        function(data) { 
            console.log("success got data", data); 
            console.log("data.length: " + data.length)
            for(var i=0;i<data.data.length;i++){
                console.log(data.data[i])
                var rating = data.data[i].rating;

              $('<div class="img_div .col-md-4"> <p>rating: '+rating+'</p> <img src="'+data.data[i].images.fixed_height_still.url+'" id="img_'+i+'"></img></div>"').appendTo('#images')
              $('#img_'+i).click( 
                  (function(x){
                        return function(){
                            var currentSrc = $('#img_'+x).attr('src')

                            if(currentSrc === data.data[x].images.fixed_height_still.url){
                                $('#img_'+x).attr('src', data.data[x].images.fixed_height.url)
                            }
                            else{
                                $('#img_'+x).attr('src', data.data[x].images.fixed_height_still.url)
                            }
                        }
                    })(i)
                )      
            }
           // $('<img src="'+data.images.fixed_height_still+'"><img>").appendTo('#images')
        });
}

function setupButtons(){
    for(var i=0;i<topics.length;i++){
        "<button id='button_1'>The Matrix</button>";

        $('<button id="button_'+i+'">'+topics[i]+'</button>').appendTo('#buttons')
        $('#button_'+i).click(
            (function(x){
               return function(){
                   handleButtonClick(x)
               }     
            })(topics[i])
        )
    }
}

$(document).ready(function(){
    setupButtons()
    var buttonSeq = 1000

    $('#new-topic').click( 
        
        function(){
            
            //closure for buttonSeq
            //to avoid clashing with other button ids
            buttonSeq++;
            console.log('new buttonseq: ' + buttonSeq)
            var newTopic = $('#new-topic-text').val()

            $('<button id="button_'+buttonSeq+'">'+newTopic+'</button>').appendTo('#buttons')
            $('#button_'+buttonSeq).click(
                (function(x){
                    return function(){
                        handleButtonClick(x)
                    }     
                })(newTopic)
            )
        }
    )
})