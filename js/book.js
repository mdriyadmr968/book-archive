document.getElementById("error-message").style.display = "none";

const searchBook = () => {
  const searchField = document.getElementById("search-text");
  const searchText = searchField.value;
  // console.log(searchText);
  searchField.value = "";
  document.getElementById("error-message").style.display = "none";
  if (searchText == "") {
    //code for if here
  } else {
    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displaySearchResult(data.docs));
  }
};

const displaySearchResult = (books) => {
  for (const book of books) {
    // console.log(book);
    const searchResult = document.getElementById("search-result");
    searchResult.textContent = "";
    if (books.length === 0) {
      //show no result found here
    }
    books.forEach((book) => {
        console.log(book);
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
        <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p>${book.author_name}</p>
                <p>${book.publisher}</p>
                <p>${book.publish_date}</p>
            </div>
        </div>
        `;
      searchResult.appendChild(div);
    });
  }
};
//cover_i
//
//publisher
//publish_date