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
  const top5Genres = books.reduce((array, book) => {
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
  top5Genres.sort((nameA, nameB) => nameB.count - nameA.count);
  return top5Genres.splice(0, 5);
}

function getMostPopularBooks(books) {
  const top5Popular = books.reduce((array, book) => {
    array.push({
      name: book.title,
      count: book.borrows.length,
    });
    return array;
  }, []);
  top5Popular.sort((nameA, nameB) => nameB.count - nameA.count);
  return top5Popular.splice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const top5Authors = authors.map((author) => {
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
  top5Authors.sort((nameA, nameB) => nameB.count - nameA.count);
  return top5Authors.splice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
