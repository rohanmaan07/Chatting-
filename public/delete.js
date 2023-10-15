
const deleteButtons = document.querySelectorAll('.delete-button');
deleteButtons.forEach((button) => {
    button.addEventListener('click', function (event) {
        event.preventDefault();
        const form = button.closest('form');
        const confirmDelete = confirm("Are you sure you want to delete this chat?");       
        if (confirmDelete) {
        form.submit();
        } 
    });
});
