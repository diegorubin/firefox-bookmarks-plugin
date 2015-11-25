var editWindow = 
{
  init: function()
  {
    this.controls = {};
    this.controls["title"] = document.getElementById('txtTitle');
  },
  doOk: function()
  {
    var args = window.arguments[0];
    args.title = this.controls["title"].value;

    window.close();
    return args;
  },
  doCancel: function()
  {
    window.close();
  }
}
