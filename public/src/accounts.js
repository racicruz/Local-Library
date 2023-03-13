function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((nameA, nameB) => nameA.name.last > nameB.name.last ? 1 : -1);
}

function getTotalNumberOfBorrows(account, books) {
  let totalBorrowed = 0
  books.forEach(book => book.borrows.forEach(borrower => borrower.id === account.id ? totalBorrowed++ : null));
  return totalBorrowed;
}

// **helper function**
function findAuthor(authors, id) {
  return authors.find(author => author.id === id);
}

function getBooksPossessedByAccount(account, books, authors) {
  let possessedBooks = [];
   //creating an array of books that are filtered by the borrowers id returned status 
   possessedBooks = books.filter(book => book.borrows[0].id === account.id && !book.borrows[0].returned);
   //creating the format for the possesed book objects and putting current book and author info inside
   possessedBooks = possessedBooks.map(book => {
    const authorInfo = findAuthor(authors, book.authorId);
    const possessedBook = {...book, author: authorInfo};
  return possessedBook;
  });
return possessedBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
