// FUNCTION TO GET INFORMATION ABOUT THE BOOK
function getBooks() {

  var background = document.body;
  var cover = false;
  var currentImage = '';
  background.style.animationPlayState = "running";
  background.classList.remove("change");
  background.classList.add("change");

  // STORING THE USER SEARCH
  var user = document.getElementById("looking").value;
  // RESETS THE DIV TO EMPTY
  document.getElementById("book_container").innerHTML = "";

  // LOOKING FOR WHAT USER HAS SEARCHED FOR
  fetch("https://openlibrary.org/search.json?q=" + user)
    // CONVERTING RESPONSE FROM STRING TO JSON OBJECT
    .then((a) => a.json())

    // GETTING THE FIRST 10 RESULT OF THE BOOK SEARCH AND GETTING INFORMATION SUCH AS THE AUTHOR'S NAME AND THE IAMGE OF THE COVER OF THE BOOK THEN UPDATING THE "display" DIV
    .then((response) => {
      for (var i = 0; i <= response.docs.length; i++) {
        var authorname = response.docs[i].author_name[0];
        var title = response.docs[i].title_suggest;
        var isbnNumber = response.docs[i].isbn[0];
        var image = "https://covers.openlibrary.org/b/isbn/" + isbnNumber + "-M.jpg";
        currentImage = image;
        console.log(currentImage);

        const img = new Image();
        img.src = "https://covers.openlibrary.org/b/isbn/" + isbnNumber + "-M.jpg";
        
        img.addEventListener("load", e => {
          imageSize(img.naturalWidth);
        });
        function imageSize(size){
          if (size > 1){
            cover = true;
          } else {
            cover = false;
          }
        }
        if (cover == true) {
          document.getElementById("book_container").innerHTML += "<div id='book'>" + "<img src='" + search.svg + "'/>" + "<h3>" + title + "</h3>" + "<p>" + authorname + "</p>" + "</div>";
        } else {
          document.getElementById("book_container").innerHTML += "<div id='book'>" + "<img src='cover.png'>" + "<h3>" + title + "</h3>" + "<p>" + authorname + "</p>" + "</div>";
        }
      }
    });
}

//http://snapbuilder.com/code_snippet_generator/image_placeholder_generator/180x240/cdcdcd/DDDDDD
// if (img.naturalWidth > 1) {
//   document.getElementById("book_container").innerHTML += "<div id='book'>" + "<img src='" + img.src + "'/>" + "<h3>" + title + "</h3>" + "<p>" + authorname + "</p>" + "</div>";
// } else {
//   document.getElementById("book_container").innerHTML += "<div id='book'>" + "<img src='cover.png'>" + "<h3>" + title + "</h3>" + "<p>" + authorname + "</p>" + "</div>";
// }