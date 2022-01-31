var $jsal={}
$jsal.postProfileComment=(username,content,option)=>{
  let json={"content":content,"parent_id":"","commentee_id":""}
  if(option!==void 0){
    if(option.reply!==void 0){
      json.parent_id=option.reply.commentid
      json.commentee_id=option.reply.userid
    }
  }
  fetch("/site-api/comments/user/"+username+"/add/",{method:"POST",headers:{'Accept':'text/html, */*; q=0.01','Content-type':'application/x-www-form-urlencoded; charset=UTF-8','X-Requested-With':'XMLHttpRequest','X-CSRFToken':document.cookie.match(/; scratchcsrftoken=(.+?);/)[1]},body:JSON.stringify(json),credentials:'include'})
}
$jsal.changeProject=(projectid,json,option)=>{
  fetch("https://projects.scratch.mit.edu/"+projectid,{method:"PUT",headers:{'Accept':'*/*','Content-type':'application/json'},body:JSON.stringify(json),credentials:'include'})
}
$jsal.readSession=(afterreading)=>{
  fetch("/session/",{headers:{'X-Requested-With':'XMLHttpRequest'},credentials:'include'}).then(a=>a.json()).then(a=>{
    $jsal.session=a
    $jsal.postProjectComment=(projectid,content,option)=>{
      let json={"content":content,"parent_id":"","commentee_id":""}
      if(option!==void 0){
        if(option.reply!==void 0){
          json.parent_id=option.reply.commentid
          json.commentee_id=option.reply.userid
        }
      }
      fetch("https://api.scratch.mit.edu/proxy/comments/project/"+projectid,{method:"POST",headers:{'Accept':'application/json','Content-type':'application/json','x-token':$jsal.session.user.token,'X-CSRFToken':document.cookie.match(/; scratchcsrftoken=(.+?);/)[1]},body:JSON.stringify(json),credentials:'include'})
    }
    $jsal.postStudioComment=(studioid,content,option)=>{
      let json={"content":content,"parent_id":"","commentee_id":""}
      if(option!==void 0){
        if(option.reply!==void 0){
          json.parent_id=option.reply.commentid
          json.commentee_id=option.reply.userid
        }
      }
      fetch("https://api.scratch.mit.edu/proxy/comments/studio/"+studioid,{method:"POST",headers:{'Accept':'application/json','Content-type':'application/json','x-token':$jsal.session.user.token,'X-CSRFToken':document.cookie.match(/; scratchcsrftoken=(.+?);/)[1]},body:JSON.stringify(json),credentials:'include'})
    }
    $jsal.toggleProfileComments=()=>{
      fetch("/site-api/comments/user/"+$jsal.session.user.username+"/toggle-comments/",{method:"POST",headers:{'X-Requested-With':'XMLHttpRequest','X-CSRFToken':document.cookie.match(/; scratchcsrftoken=(.+?);/)[1]},credentials:'include'})
    }
    if(afterreading!==void 0){
      afterreading(a)
    }
  })
}