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

  }

};

var gBookmarksHandler = 
{
  showPopup: function() 
  {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "http://diegorubin.com/admin/bookmarks.json", true);
    xmlhttp.onreadystatechange=function()
    {
      if (xmlhttp.readyState==4)
      {
        var menu = document.getElementById('bookmarks-tags');

        while (menu.firstChild) {
          menu.removeChild(menu.firstChild);
        }

        var jsonResponse = JSON.parse(xmlhttp.responseText);

        var tags = {};

        for(var link in jsonResponse)
        {
          var ts = jsonResponse[link].tags.split(",");
          for(var t in ts)
          {
            ts[t] = ts[t].trim();
            if(tags[ts[t]])
            {
              tags[ts[t]].push({title:jsonResponse[link].title,
                                link:jsonResponse[link].link});
            }
            else
            {
              tags[ts[t]] = [
                {title:jsonResponse[link].title,
                 link:jsonResponse[link].link}
              ];
            }
          }
         
        }

        var otags = [];
        for(var t in tags)
          otags.push(t);

        otags.sort();


        for(var x = 0; x < otags.length; x++)
        {
          var t = otags[x];
          var nmenu = document.createElement("menu");
          nmenu.setAttribute("id", t);
          nmenu.setAttribute("label", t);

          var popup = document.createElement("menupopup");
          popup.setAttribute("id", "t" + t);

          for(var l in tags[t])
          {
            var item = document.createElement("menuitem");
            item.setAttribute("label", tags[t][l].title);
            item.setAttribute("oncommand", "goTo('"+ tags[t][l].link+"')");
          
            popup.appendChild(item);
          }

          nmenu.appendChild(popup);
          menu.appendChild(nmenu); 
        }

      }
    };
    xmlhttp.send(null);

    return false;
  },
};

