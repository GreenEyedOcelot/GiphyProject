$(document).ready(function () {
   var topics = ["tetrahedron", "octahedron", "dodecahedron", "icosahedron", "sphere",
      "cylinder", "triangular pyramid", "square pyramid", "cube", "cuboid",
      "torus", "rectangular solid", "triangular prism", "square prism", "pentagonal prism"
   ]
   const N_TOPICS = 15;

   console.log("page loads at ", new Date());
   initUI();

   function initUI() {
      resetButtons();
   }

   function resetButtons() {
      var nTopics = topics.length;
      $("#buttoncol").empty();

      for (let i = 0; i < nTopics; i++) {
         $("#buttoncol").append($("<button><\/button>")
            .attr("type", "button")
            .attr("class", "btn btn-primary mybtn getgifsbtn")
            .attr("data-offset", "0")
            .text(topics[i]));
      }
   }


   $("#addbutton").click(function () {
      var btnToAdd = $("#buttontext").val().trim();

      if (btnToAdd) { // if text field has a value in it.
         topics.push(btnToAdd);
         $("#buttontext").val("");
      }

      resetButtons();
   });


   $('body').on('click', 'img.switchimage', function (event) {
      var img = $(this);
      var temp = img.attr("src");

      img.attr("src", img.attr("data-altsrc"));
      img.attr("data-altsrc", temp);
   })


   $('body').on('click', '.getgifsbtn', function (event) {
      var topic = $(this).text();
      var offset = $(this).data("offset");
      console.log("button offset is: " + offset);
      var quantity = $("#quantitymenu option:selected").attr("value")
      var queryStr = "http://api.giphy.com/v1/gifs/search?q=" + window.encodeURI(topic) +
         "&api_key=MjXFP7cW1sQX7gF8x8R9MvosdvYlNd2n&limit=" + quantity + "&offset=" + offset;

      var i, thisGif, thisFig, replaceStr, thisStillImg, thisAnimatedImg, thisRating, thisImgObj, thisTitle;
      var imgWrapperNode = $("#imagewrapper");
      var behavior = $("#behaviormenu").val();

      // change offset property on button
      $(this).data("offset", parseInt(offset) + parseInt(quantity));
      $(this).attr("data-offset", parseInt(offset) + parseInt(quantity));


      $.ajax({
         url: queryStr,
         method: "GET"
      }).done(function (response) {
         console.log(response);

         if (response && response.meta.status === 200) {
            replaceStr = "";

            for (i = 0; i < quantity; i++) {
               thisGif = response.data[i];

               if (thisGif) {
                  thisTitle = thisGif.title;
                  thisRating = thisGif.rating;
                  thisImgObj = thisGif.images;
                  thisStillImg = thisImgObj.fixed_height_still.url;
                  thisAnimatedImg = thisImgObj.fixed_height.url;

                  // remove "GIF" part from title
                  // combine title with rating
                  if (thisTitle) {
                     thisTitle = thisTitle.substring(0, thisTitle.length - 4) + ", " + thisRating.toUpperCase();
                  } else {
                     thisTitle = thisRating;
                  }

                  replaceStr += '<figure>' +
                     '<img src="' + thisStillImg + '" ' +
                     'data-altsrc="' + thisAnimatedImg + '" ' +
                     'class="switchimage" ' +
                     '>' +
                     '<figcaption>' + thisTitle + '<\/figcaption>' +
                     '<\/figure>';

               }
            } // end for loop

            // replace, append, or prepend, per user preference
            if (replaceStr) {
               if (behavior === "replace") {
                  imgWrapperNode.html(replaceStr);
               } else if (behavior === "append") {
                  imgWrapperNode.append(replaceStr);
               } else { // behavior is prepend
                  imgWrapperNode.prepend(replaceStr);
               }
            }
         }
      });

   })

   $("#resetpage").click(function () {
      location.reload(false);
   });

   $("#cleargifs").click(function () {
      $("#imagewrapper").empty();
   });

   $("#resetbuttons").click(function () {
      topics.splice(N_TOPICS);
      resetButtons();
   });
});