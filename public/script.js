const loadPosts = () => {
    $.get("http://127.0.0.1:3000/posts", (posts) => {
      for (let post of posts) {
          const x = `
              <div>
              <span>ID: </span>${post.$loki} <br />
              <span>Username: </span>${post.username} <br />
              <span>Content: </span>${strip(post.content)} <br />
              <button onClick="deletePost(${post.$loki});">Delete</button><button onClick="editPost(${post.$loki})">Edit</button>
              </div>
              <hr />
          `

          document.getElementById("posts").innerHTML = document.getElementById("posts").innerHTML + x;
      }
    });
}

const loadUsers = () => {
  $.get("http://127.0.0.1:3000/users", (users) => {
    for (let user of users) {
        const x = `
            <div>
            <span>ID: </span>${user.$loki} <br />
            <span>User: </span>${user.username} <br />
            <span>Password: </span>${user.password} <br />
            </div>
            <hr />
        `

        document.getElementById("users").innerHTML = document.getElementById("users").innerHTML + x;
    }
  });
}

const loadSelf = () => {
  $.get("http://127.0.0.1:3000/session", (username) => {
    $("#currentUser").text(username);
  })
}

const postPost = (e) => {
  e.preventDefault();
  let id = $("#submit").attr("data-id");
  let url = (isNaN(id)) ? "http://127.0.0.1:3000/post" : `http://127.0.0.1:3000/post/${id}`;

  $.post(url, $("#post").serialize()).done(function (){
    location.reload();
  }).fail(() => {
      showAlert("Log in first.")
  });
}

const editPost = (id) => {
    $.get(`http://127.0.0.1:3000/post/${id}`, (data) => {
      $("#content").val(data.post.content);
    });
    $("#submit").attr("data-id", id);
}

const deletePost = (id) => {
  $.delete(`http://127.0.0.1:3000/post/${id}`).done(() => {
    location.reload();
  });
}

const register = () => {
  $.post("http://127.0.0.1:3000/register", $("#register").serialize()).done(() => {
    location.reload();
  });
}

const login = (e) => {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:3000/login",
    data: $("#login").serialize()
  }).done((boolean) => {
    if (boolean) {
      location.reload();
    } else {
      showAlert("Password is not adding up...")
    }
  }).fail(() => {
    showAlert("Username not found");
  });
}

const logout = () => {
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:3000/logout"
  }).done((res) => {
    //showAlert(res)
    location.reload();
  }).fail((res) => {
    showAlert(res.responseText);
  });
}

const showAlert = (x) => {
  const alerts = $("#alerts");
  alerts.append("> " + x + "<br />");
}

const strip = (html) => {
   var doc = new DOMParser().parseFromString(html, 'text/html');
   return doc.body.textContent || "";
}

// Event listeners
$("#submit").click(postPost);
$("#submit2").click(register);
$("#submit3").click(login);
$("#logout").click(logout);

// Init
loadPosts();
loadUsers();
loadSelf();
