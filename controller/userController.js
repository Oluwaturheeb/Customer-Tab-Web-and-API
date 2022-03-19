export const userinfo = async (req, res) => {
	try {
	  let data = (req.params.type == 1) ? req.session.mytab : req.session.othertab;
	  let resp = data.filter(d => d.id == req.params.id)[0];
	  resp.email = req.cookies.user.emails[0].value
	  res.render('user', resp);
  } catch (e) {
    res.send('Server error' + e.message);
  }
};
