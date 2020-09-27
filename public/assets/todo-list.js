$(document).ready(function(){

  $('form').on('submit', function(){

      var item = $('form input');
      var todo = {item: item.val()};

      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  });

  $('li').on('click', function(){
    //access data from ejs
      var item = $(this).data()
      $.ajax({
        type: 'DELETE',
        url: `/todo/${item.id}`,        
        success: function(data){
          console.log(data);
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });
});
