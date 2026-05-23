/**
 * Partial Loader for Admol Services
 * Loads header and footer from partials folder
 */
$(document).ready(function() {
    // 1. Load Header
    $("#header-placeholder").load("partials/header.html", function() {
        // Highlight active menu item
        var path = window.location.pathname.split("/").pop();
        if (path === "" || path === "index.html") {
            $("#nav-index").addClass("current-item");
        } else {
            // Find link matching path and add class to parent li
            var fileName = path.split(".")[0];
            $("#nav-" + fileName).addClass("current-item");
        }
        
        // Re-initialize classyNav plugin
        if ($.fn.classyNav) {
            $('#uzaNav').classyNav();
        }

        // Re-initialize sticky header logic if needed
        var uza_window = $(window);
        uza_window.on('scroll', function () {
            if (uza_window.scrollTop() > 0) {
                $('.header-area').addClass('sticky');
            } else {
                $('.header-area').removeClass('sticky');
            }
        });
    });

    // 2. Load Footer
    $("#footer-placeholder").load("partials/footer.html", function() {
        // Update year
        if (document.getElementById('displayYear')) {
            document.getElementById('displayYear').innerText = new Date().getFullYear();
        }
    });
});