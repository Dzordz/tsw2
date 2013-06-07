exports.index = function(req,res){
  res.render("index", {
    title : 'Test'
  });
};

exports.main = function(req,res){
  req.session.user = req.session.user || req.app.get('user');
  res.render("main", {
    username : req.session.user.username
  });
}
