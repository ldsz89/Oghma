/* Created by Professor Wergeles for CS4830 at the University of Missouri */

var listApp = angular.module('listApp', []);
	listApp.controller('StudentListController', function($scope) {
		$scope.studentStatus = {
			studentStatus: null,
			option1: 'active'
		}

		var studentList = this;

		studentList.students = (localStorage.getItem('students') !== null) ? JSON.parse(localStorage.getItem('students')) : [];
		studentList.activeStudents = (localStorage.getItem('activeStudents') !== null) ? JSON.parse(localStorage.getItem('activeStudents')) : 0;
		studentList.inactiveStudents = (localStorage.getItem('inactiveStudents') !== null) ? JSON.parse(localStorage.getItem('inactiveStudents')) : 0;

		studentList.removeAll = function() {
			studentList.students = [];
			localStorage.setItem('students', JSON.stringify(studentList.students));
		}

		studentList.removeStudent = function(student) {
			var tempStudents = studentList.students;

			tempStudents.splice(tempStudents.indexOf(student), 1);

			localStorage.setItem('students', JSON.stringify(tempStudents));
		}

		studentList.remaining = function() {
			var count = 0;

			angular.forEach(studentList.students, function(student) {
				count += student.done ? 0 : 1;
			});

			return count;
		};

		studentList.addStudent = function() {
			// Add student to students array
			studentList.students.push( {
        number: studentList.studentNumber,
        name: studentList.studentName,
        address: studentList.studentAddress,
        phone: studentList.studentPhone,
        gpa: studentList.studentGPA,
        acad_plan: studentList.studentAcadPlan,
        level: studentList.studentLevel,
        status: studentList.studentStatus,
        done: false
      } );

			studentList.studentStatus == "active" ? studentList.activeStudents += 1 : studentList.inactiveStudents += 1;

			// clears text box
			studentList.studentNumber = '';
      studentList.studentName = '';
			studentList.studentAddress = '';
			studentList.studentPhone = '';
			studentList.studentGPA = '';
			studentList.studentAcadPlan = '';
			studentList.studentLevel = '';
			studentList.studentStatus = '';

			// save students array to browser
			localStorage.setItem('students', JSON.stringify(studentList.students));
			localStorage.setItem('activeStudents', JSON.stringify(studentList.activeStudents));
			localStorage.setItem('inactiveStudents', JSON.stringify(studentList.inactiveStudents));
		};

		studentList.archive = function() {
			var oldStudents = studentList.students;

			studentList.students = [];

			angular.forEach(oldStudents, function(student) {
				if(!student.done) {
					studentList.students.push(student);
				}
				else {
					student.status == "active" ? studentList.activeStudents -= 1 : studentList.inactiveStudents -= 1;
					console.log(student.name + " was deleted");
				}
				// student.studentStatus == "active" ? studentList.activeStudents -= 1 : studentList.inactiveStudents -= 1;
			});

			localStorage.setItem('students', JSON.stringify(studentList.students));
			localStorage.setItem('activeStudents', JSON.stringify(studentList.activeStudents));
			localStorage.setItem('inactiveStudents', JSON.stringify(studentList.inactiveStudents));
		};

		studentList.refresh = function(checked) {
			var tempStudents = JSON.parse(localStorage.getItem('students'));

			// Keeps check items checked
			angular.forEach(tempStudents, function(student) {
				if(angular.equals(checked.student.text, student.text)) {
					student.done = !student.done;
					localStorage.setItem('students', JSON.stringify(tempStudents));
				}
			});
		};
	});

	listApp.controller('BookListController', function($scope) {
		$scope.bookStatus = {
			bookStatus: null,
			option1: 'in-stock'
		}

		var bookList = this;

		bookList.books = (localStorage.getItem('books') !== null) ? JSON.parse(localStorage.getItem('books')) : [];
		bookList.inBooks = (localStorage.getItem('inBooks') !== null) ? JSON.parse(localStorage.getItem('inBooks')) : 0;
		bookList.outBooks = (localStorage.getItem('outBooks') !== null) ? JSON.parse(localStorage.getItem('outBooks')) : 0;

		bookList.remaining =  function() {
			var count = 0;

			angular.forEach(bookList.books, function(books) {
				count += books.done ? 0 : 1;
			});

			return count;
		};

		bookList.addBook = function() {
			// Add book to books array
			bookList.books.push({
				isbn: bookList.bookIsbn,
				name: bookList.bookName,
				author: bookList.bookAuthor,
				publisher: bookList.bookPublisher,
				year: bookList.bookYear,
				type: bookList.bookType,
				edition: bookList.bookEdition,
				status: bookList.bookStatus,
				done: false
			});

			bookList.bookStatus == "in-stock" ? bookList.inBooks += 1 : bookList.outBooks += 1;

			// clears text box
			bookList.bookIsbn = '';
			bookList.bookName = '';
			bookList.bookAuthor = '';
			bookList.bookPublisher = '';
			bookList.bookYear = '';
			bookList.bookType = '';
			bookList.bookEdition = '';

			// Save books array to browser
			localStorage.setItem('books', JSON.stringify(bookList.books));
			localStorage.setItem('inBooks', JSON.stringify(bookList.inBooks));
			localStorage.setItem('outBooks', JSON.stringify(bookList.outBooks));

		};

		bookList.archive = function() {
			var oldBooks = bookList.books;

			bookList.books = [];

			angular.forEach(oldBooks, function(books) {
				if(!books.done) bookList.books.push(books);
			});

			bookList.bookStatus == "in-stock" ? bookList.inBooks -= 1 : bookList.outBooks -= 1;

			localStorage.setItem('books', JSON.stringify(bookList.books));
			localStorage.setItem('inBooks', JSON.stringify(bookList.inBooks));
			localStorage.setItem('outBooks', JSON.stringify(bookList.outBooks));
		};

		bookList.refresh = function(checked) {
			var tempBooks = JSON.parse(localStorage.getItem('books'));

			// keeps check items checked
			angular.forEach(tempStudents, function(student) {
				if(angular.equals(checked.book.text, book.text)) {
					book.done = !book.done;
					localStorage.setItem('books', JSON.stringify(tempBooks));
				}
			});
		};
	});
