var gBookmarksManager = 
{
  addBookmark: function()
  {
    var title = document.title;

    var mainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
                   .getInterface(Components.interfaces.nsIWebNavigation)
                   .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
                   .rootTreeItem
                   .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
                   .getInterface(Components.interfaces.nsIDOMWindow);

    var link = mainWindow.getBrowser().selectedBrowser.contentWindow.location.href;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'http://bookmarks.diegorubin.com/api/v1/bookmarks', true);
    xmlhttp.onreadystatechange = function()
    {
      if (xmlhttp.readyState==4) {
        alert('link da página ' + title + ' adicionado corretamente');
      }
    }
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({title: title, url: link}));

  }

};

var gBookmarksHandler = 
{
  showPopup: function() 
  {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "http://bookmarks.diegorubin.com/api/v1/bookmarks", true);
    xmlhttp.onreadystatechange=function()
    {
      if (xmlhttp.readyState==4)
      {
        var menu = document.getElementById('bookmarks-titles');

        while (menu.firstChild) {
          menu.removeChild(menu.firstChild);
        }

        var jsonResponse = JSON.parse(xmlhttp.responseText);

        for(var i in jsonResponse)
        {
          var bookmark = jsonResponse[i];
          var item = document.createElement("menuitem");
          item.setAttribute("label", bookmark.title);
          item.setAttribute("oncommand", "goTo('"+ bookmark.url +"')");
          
          menu.appendChild(item);
        }

      }
    };
    xmlhttp.send(null);

    return false;
  },
};

function goTo(link)
{

  var win = Components.classes['@mozilla.org/appshell/window-mediator;1']
      .getService(Components.interfaces.nsIWindowMediator)
      .getMostRecentWindow('navigator:browser');
    win.openUILinkIn(link, 'tab');
}

