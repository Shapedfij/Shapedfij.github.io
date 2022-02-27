var current_page_pointer = 1;

function get_pages() {
  var pointer = 1;
  while (document.getElementById("page_" + pointer) != null) {
    pointer++;
  }
  return pointer - 1;
}

function next_page() {
  var page_count = get_pages();
  if (current_page_pointer < page_count) {
    var current_page = document.getElementById("page_" + current_page_pointer);
    var next_page = document.getElementById(
      "page_" + (current_page_pointer + 1)
    );
    current_page.style.visibility = "hidden";
    next_page.style.visibility = "visible";

	if(current_page_pointer + 1 == page_count) {
			current_page.style.visibility = "hidden";
		}
    
    current_page_pointer++;
  } 
}
