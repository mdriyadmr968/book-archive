const searchBook = () => {
  const searchField = document.getElementById("search-text");
  const searchText = searchField.value;
  // console.log(searchText);
  searchField.value = "";
  if (searchText == "") {
    let error = document.getElementById("error-message");
    error.classList.add(
      "alert",
      "alert-danger",
      "text-center",
      "fs-5",
      "w-25",
      "mx-auto"
    );
    error.innerHTML = "Please search something";
  } else {
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displaySearchResult(data));
  }
};

const displaySearchResult = (books) => {
  if (books.docs.length === 0) {
    let error = document.getElementById("error-message");
    error.classList.add(
      "alert",
      "alert-danger",
      "text-center",
      "fs-5",
      "w-25",
      "mx-auto"
    );
    error.innerHTML = "No Result Found";
  } else {
    let item = books.docs.slice(0, 26);
    let searchResult = document.getElementById("search-result");
    let totalResult = document.getElementById("total-result");
    searchResult.innerHTML = "";
    item.forEach(book => {
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
     totalResult.innerHTML = `Show ${item.length} items from ${books.numFound} results`;
  }
}
