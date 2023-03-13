function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

function findBookById(books, id) {
  return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const borrowed = books.filter(book => book.borrows[0].returned === false);
  const returned = books.filter(book => book.borrows[0].returned === true);
  return [borrowed, returned];
}

function getBorrowersForBook(book, accounts) {
  return book.borrows.reduce((acc, txn) => {
    let accountObj = accounts.find((account) => account.id === txn.id);
    acc.push({
      ...accountObj,
      returned: txn.returned
    })
    return acc;
  }, []).splice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
