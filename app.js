$(document).ready(function() {
  

var redditAPI = "http://www.reddit.com/search.json?q=subreddit:";


 $('form').submit(function (evt) {
    var $submitButton = $('#submit');
    var $searchField = $('#search');
    evt.preventDefault();

    $searchField.prop("disabled",true);
    $submitButton.attr("disabled", true).val("searching....");
    $submitButton.addClass('btn-warning');  

    var sParams = '&limit=50&sort=new'//for get more data ;);
    var sQuery = $searchField.val() ;

    $('#photos').html('');

    $.getJSON(redditAPI + sQuery + sParams,
    function(data){
      var HTML = '';
      if (data.data.children.length > 0) {
        $.each(data.data.children,function(i,data) {
          if ((/\.(gif|jpg|jpeg|tiff|png)$/i).test(data.data.url)) {
            HTML += '<div class="col-lg-4 col-sm-6">';
            HTML += '<div class="thumbnail">'
            HTML += '<a href="' + data.data.url + '" class="image" target="_blank">';
            HTML += '<img src="' + data.data.url + '"></a></div>';
            HTML += '</div>'; 
          }else{
            HTML += '';
          }
        }); // end each
      } else {
        HTML = "<p>No photos found that match: " + sQuery + ".</p>"
      }
      $('#photos').html(HTML);
      $searchField.prop("disabled", false);
      $submitButton.attr("disabled", false).val("Search");
      $submitButton.removeClass('btn-warning') 
    }); // end getJSON

  }); // end click

}); // end ready