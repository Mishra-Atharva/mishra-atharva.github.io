// CHECKING JAVASCRIPT
console.log("working!")

// FUNCTION TO GET INFORMATION ABOUT THE BOOK
function getBooks(){
    
    // RESETS THE DIV TO EMPTY
    document.getElementById("display").innerHTML="";

    // LOOKING FOR WHAT USER HAS SEARCHED FOR
    fetch("https://openlibrary.org/search.json?q="+document.getElementById("looking").value)

    // CONVERTING RESPONSE FROM STRING TO JSON
    .then(a => a.json())

    // GETTING THE FIRST 10 RESULT OF THE BOOK SEARCH AND GETTING INFORMATION SUCH AS THE AUTHOR'S NAME AND THE IAMGE OF THE COVER OF THE BOOK THEN UPDATING THE "display" DIV
    .then(response => {
        for(var i = 0; i <= 10; i++){
            
            var authorname = response.docs[i].author_name[0];
            var title = response.docs[i].title_suggest;
            var isbnNumber = response.docs[i].isbn[0];
            var cover = response.docs[i].cover_i;
            imgCheck = imgSize(isbnNumber);

            if (cover == true && imgCheck == true) {
                var image = "<img src='https://covers.openlibrary.org/b/isbn/" + isbnNumber + "-M.jpg'/>";
                document.getElementById("display").innerHTML += "<div class='book'>" + image + "<h3>" + title + "</h3>" + authorname + "</div>";
            }else{
                document.getElementById("display").innerHTML += "<div class='book'>" + "<img src='http://snapbuilder.com/code_snippet_generator/image_placeholder_generator/180x240/cdcdcd/DDDDDD'>" + "<h3>" + title + "</h3>" + authorname + "</div>";
            }
        }
    });
}
// url = "https://covers.openlibrary.org/b/isbn/9780596154578-L.jpg";
// urlbroken = "https://covers.openlibrary.org/b/isbn/9781556856549-L.jpg";

function imgSize(isbn) {
    // create image
    var image = "https://covers.openlibrary.org/b/isbn/" + isbn + "-M.jpg";
    
    var img = new Image();
    img.onload = function() {
        if (this.width > 1) {
            return true;
        }else{
            return false;
        }
    };
    img.src = image;
}
