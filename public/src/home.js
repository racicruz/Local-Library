function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((borrowed, book) => {
    if (!book.borrows[0].returned) borrowed++;
    return borrowed;
  }, 0);
}

function getMostCommonGenres(books) {
  const genreCount = books.reduce((array, book) => {
    const genre = array.find((gen) => gen.name === book.genre);
    if (!genre) {
      array.push({
        name: book.genre,
        count: 1,
      });
    } else {
      genre.count++;
    }
    return array;
  }, []);
  genreCount.sort((nameA, nameB) => nameB.count - nameA.count);
  let top5Genres = genreCount.splice(0, 5);
  return top5Genres;
}

function getMostPopularBooks(books) {
  const borrowCount = books.reduce((array, book) => {
    array.push({
      name: book.title,
      count: book.borrows.length,
    });
    return array;
  }, []);
  borrowCount.sort((nameA, nameB) => nameB.count - nameA.count);
  let top5Popular = borrowCount.splice(0, 5);
  return top5Popular;
}

function getMostPopularAuthors(books, authors) {
  const popularAuthors = authors.map((author) => {
    const authorName = `${author.name.first} ${author.name.last}`;
    const booksBy = books.filter((book) => book.authorId === author.id);
    const borrows = booksBy.reduce(
      (total, book) => total + book.borrows.length,
      0
    );
    const authorInfo = {
      name: authorName,
      count: borrows,
    };
    return authorInfo;
  });
  popularAuthors.sort((nameA, nameB) => nameB.count - nameA.count);
  let top5Authors = popularAuthors.splice(0, 5);
  return top5Authors;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
