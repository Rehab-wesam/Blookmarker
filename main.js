var websiteNameInput = document.getElementById("siteName");
var websiteURLInput = document.getElementById("siteURL");
var searchInput = document.getElementById("searchInput");
var container = JSON.parse(localStorage.getItem("sitedescription")) || [];

function isValidURL(url) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ 
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ 
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
    '(\\#[-a-z\\d_]*)?$','i');
    return pattern.test(url);
}

function isDuplicateURL(url) {
    for (var i = 0; i < container.length; i++) {
        if (container[i].websiteURL === url) {
            return true;
        }
    }
    return false;
}

function addSites() {
    var siteName = websiteNameInput.value.trim();
    var siteURL = websiteURLInput.value.trim();

    if (siteName === '' || siteURL === '') {
        alert('Please enter both Site Name and Site URL.');
        return;
    }

    if (!isValidURL(siteURL)) {
        alert('Please enter a valid URL.');
        return;
    }

    if (isDuplicateURL(siteURL)) {
        alert('This website URL is already bookmarked.');
        return;
    }

    var des = {
        websiteName: siteName,
        websiteURL: siteURL
    };
    
    container.push(des);
    localStorage.setItem("sitedescription", JSON.stringify(container));
    clearForm();
    display();
}

function clearForm() {
    websiteNameInput.value = "";
    websiteURLInput.value = "";
}

function display() {
    var cartona = ``;
    for (let i = 0; i < container.length; i++) {
        cartona += `<tr>
            <td>${i + 1}</td>
            <td>${container[i].websiteName}</td>
            <td class="text-center"><a href="${container[i].websiteURL}" target="_blank" class="btn btn-warning">Visit</a></td>
            <td class="text-center"><button onclick="deleteSite(${i})" class="btn btn-danger">Delete</button></td>
        </tr>`;
    }
    document.getElementById("row").innerHTML = cartona;
}

function deleteSite(index) {
    container.splice(index, 1);
    localStorage.setItem("sitedescription", JSON.stringify(container));
    display();
}

function search() {
    var term = searchInput.value.toLowerCase();
    var cartona = ``;
    for (let i = 0; i < container.length; i++) {
        if (container[i].websiteName.toLowerCase().includes(term)) {
            cartona += `<tr>
                <td>${i + 1}</td>
                <td>${container[i].websiteName}</td>
                <td class="text-center"><a href="${container[i].websiteURL}" target="_blank" class="btn btn-warning">Visit</a></td>
                <td class="text-center"><button onclick="deleteSite(${i})" class="btn btn-danger">Delete</button></td>
               
            </tr>`;
        }
    }
    document.getElementById("row").innerHTML = cartona;
}

// Initial display call to render any existing data on page load
window.onload = display;