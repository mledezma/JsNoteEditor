
// IIEF
(function(window){
	var Noteform = document.getElementById('noteForm');
	var form = {
		title: Noteform.title,
		content: Noteform.content,
	}
	var notes = null;

	function composeNote(note){
		var div = document.createElement('div');
		var h1 = document.createElement('h1');
		var p = document.createElement('p');
		var footer = composeNoteFooter();

		div.setAttribute('id', note.id);
		div.classList.add('note');

		h1.innerText = note.title;
		p.innerText = note.content;

		div.appendChild(h1);
		div.appendChild(p);
		div.appendChild(footer);
		return div;
	}

	function composeNoteFooter(note){
		var footer = document.createElement('footer');
		var edit = document.createElement('button');
		var remove = document.createElement('button');

		edit.innerText = 'Edit';
		remove.innerText = 'Delete';

		remove.addEventListener('click', deleteNote);

		footer.appendChild(edit);
		footer.appendChild(remove);
		return footer;
	}

	function removeNote(id){
		if(!id) return new Error('Id param required');

		var note = document.getElementById(id);
		if(note) note.parentNode.removeChild(note);
	}

	function renderNotes(){
		var container = document.getElementById('noteBook');
		var noteBook = notes.map(composeNote);

		noteBook.forEach(function(note){
			container.appendChild(note);
		});
	}

	function main(data){
		if(data && Array.isArray(data)){
			notes = data;
			return renderNotes();
		}

		return new Error('Notes Array params required', notes);
	}

	function showEditor(){
		document.getElementById('noteBook').className = 'hidden';
		document.getElementById('noteNode').className = '';
	}

	function discardNote(){
		document.getElementById('noteNode').className = 'hidden';
		document.getElementById('noteBook').className = '';
		form.title.value = '';
		form.content.value = '';
		document.getElementById('numLetters').innerText = "Ud ha escrito " + 0 + " carácteres";
	}

	function deleteNote(){
		var note = this.closest('div');
		note.parentNode.removeChild(note);
	}

	function editNote() {

	}

	function countLetters() {
		this.noteText = function(){
			var numLetters = form.content.value.length;
			document.getElementById('numLetters').innerText = "Ud ha escrito " + form.content.value.length + " carácteres";
		}

		form.content.addEventListener('keyup', this.noteText);
		form.content.addEventListener('keydown', this.noteText);
	}

	function saveNote() {
		var notes = [];
		var i = {
			id: notes.length, //Cambiar
			title: form.title.value,
			content: form.content.value,
		}
		notes.push(i);
		app.main(notes);
		discardNote();
	}

	window.app = {
		main: main,
		remove: removeNote,
		showEditor: showEditor,
		discard: discardNote,
		delete: deleteNote,
		edit: editNote,
		letters: countLetters,
		new: saveNote,
	};

}(window));
app.letters();
document.getElementById('addNote').addEventListener('click', app.showEditor);
document.getElementById('discard').addEventListener('click', app.discard);
document.getElementById('save').addEventListener('click', app.new);
