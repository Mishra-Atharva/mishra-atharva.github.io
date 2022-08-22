// FUNCTION TO GET INFORMATION ABOUT THE BOOK
function getBooks() {
  // RESETS THE DIV TO EMPTY
  document.getElementById("display").innerHTML = "";

  // LOOKING FOR WHAT USER HAS SEARCHED FOR
  fetch(
    "https://openlibrary.org/search.json?q=" +
      document.getElementById("looking").value
  )
    // CONVERTING RESPONSE FROM STRING TO JSON OBJECT
    .then((a) => a.json())

    // GETTING THE FIRST 10 RESULT OF THE BOOK SEARCH AND GETTING INFORMATION SUCH AS THE AUTHOR'S NAME AND THE IAMGE OF THE COVER OF THE BOOK THEN UPDATING THE "display" DIV
    .then((response) => {
      for (var i = 0; i <= 9; i++) {
        var authorname = response.docs[i].author_name[0];
        var title = response.docs[i].title_suggest;
        var isbnNumber = response.docs[i].isbn[0];

        const img = new Image();
        img.src =
          "https://covers.openlibrary.org/b/isbn/" + isbnNumber + "-M.jpg";
        console.log(img.src);

        img.addEventListener("load", () => {
          console.log(img.naturalWidth);
          if (img.naturalWidth > 1) {
            document.getElementById("display").innerHTML +=
              "<div class='book'>" +
              "<img src='" +
              img.src +
              "'/>" +
              "<h3>" +
              title +
              "</h3>" +
              authorname +
              "</div>";
          } else {
            document.getElementById("display").innerHTML +=
              "<div class='book'>" +
              "<img src='http://snapbuilder.com/code_snippet_generator/image_placeholder_generator/180x240/cdcdcd/DDDDDD'>" +
              "<h3>" +
              title +
              "</h3>" +
              authorname +
              "</div>";
          }
        });
      }
    });
}
