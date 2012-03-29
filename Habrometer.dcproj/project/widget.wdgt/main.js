var updateTimer;
var updateInterval = (((60*1000) * 60) * 5);
var preferenceKey = "habrometerUserName";
var userImageUrl;

// set true to enable debug output
var debug = false;

//-------------------------------------------------//
function log(message)
{
    if (debug)
    {
        alert(message);
    }
}

//-------------------------------------------------//
function userName()
{
    return document.getElementById("nameEdit").value;
}

function setUserName(name)
{
    document.getElementById("nameEdit").value = name;
}

function userImageUrl()
{
    return "http://habrometr.ru/habrometr_425x120_" + userName() + ".png";
}

//-------------------------------------------------//
function loadPrefs()
{
    var name = widget.preferenceForKey(widget.identifier + "-" + preferenceKey);
    log(widget.identifier + "-" + preferenceKey);
    log("name from preferences: " + name);
    if (name != null)
        setUserName(name);

}

function savePrefs()
{
    widget.setPreferenceForKey(userName(), widget.identifier + "-" + preferenceKey);
}

//-------------------------------------------------//
function startTimer(msec)
{
    log("start timer");
    updateTimer = setTimeout("updateStats()", msec);
}

function stopTimer()
{
    clearTimeout(updateTimer);
}

function updateStats()
{
    log("update");
    var online = window.navigator.onLine;
    if (online)
    {
        var url = userImageUrl();
        log(url);
        document.getElementById("habrometer").firstElementChild.src = "";
        document.getElementById("habrometer").firstElementChild.src = url;
    }
    startTimer(updateInterval);
}

//-------------------------------------------------//
function onLogoClicked()
{
    var websiteURL = "http://habrometr.ru/";
    widget.openURL(websiteURL);
}

function load()
{
    log("load");
    dashcode.setupParts();
    loadPrefs();
}

function remove()
{
    stopTimer();
    savePrefs();
}

function hide()
{
    stopTimer();
    savePrefs();
}

function show()
{
    log("show");
    loadPrefs();
    startTimer(0);
}

function sync()
{
    loadPrefs();
}

function showBack(event)
{
    stopTimer();
    var front = document.getElementById("front");
    var back = document.getElementById("back");

    if (window.widget) {
        widget.prepareForTransition("ToBack");
    }

    front.style.display = "none";
    back.style.display = "block";

    if (window.widget) {
        setTimeout('widget.performTransition();', 0);
    }
}

function showFront(event)
{
    startTimer(0);
    var front = document.getElementById("front");
    var back = document.getElementById("back");

    if (window.widget) {
        widget.prepareForTransition("ToFront");
    }

    front.style.display="block";
    back.style.display="none";

    if (window.widget) {
        setTimeout('widget.performTransition();', 0);
    }
}

if (window.widget) {
    widget.onremove = remove;
    widget.onhide = hide;
    widget.onshow = show;
    widget.onsync = sync;
}
