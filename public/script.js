const loadPosts = () => {
    $.get("http://127.0.0.1:3000/posts", (posts) => {
      for (let post of posts) {
          const x = `
              <div>
              <span>ID: </span>${post.$loki} <br />
              <span>Username: </span>${post.username} <br />
              <span>Content: </span>${strip(post.content)} <br />
              <button onClick="deletePost(${post.$loki});">Delete</button><button onClick="editPost(${post.$loki})">Replace</button>
              </div>
              <hr />
          `
          document.getElementById("posts").innerHTML = document.getElementById("posts").innerHTML + x;
      }
    }).fail((res) => {
      showAlert(res.responseText);
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
            <button onClick="deleteUser(${user.$loki});">Delete</button> <br />
            </div>
            <hr />
        `
        document.getElementById("users").innerHTML = document.getElementById("users").innerHTML + x;
    }
  }).fail((res) => {
    showAlert(res.responseText);
  });;
}

const loadSelf = () => {
  $.get("http://127.0.0.1:3000/session", (username) => {
    $("#currentUser").text(username);
  }).fail((res) => {
    showAlert(res.responseText);
  });
}

const postPost = (e) => {
  e.preventDefault();
  let url = "http://127.0.0.1:3000/post";

  $.post(url, $("#post").serialize()).done(() => {
    location.reload();
  }).fail((res) => {
    showAlert(res.responseText);
  });
}

const editPost = (id) => {
  $.put(`http://127.0.0.1:3000/post/${id}`, $("#post").serialize()).done(() => {
    location.reload();
  }).fail((res) => {
    showAlert(res.responseText);
  });
}

const deletePost = (id) => {
  $.delete(`http://127.0.0.1:3000/post/${id}`).done(() => {
    location.reload();
  }).fail((res) => {
    showAlert(res.responseText);
  });
}

const deleteUser = (id) => {
  $.delete(`http://127.0.0.1:3000/user/${id}`).done(() => {
    location.reload();
  }).fail((res) => {
    showAlert(res.responseText);
  });
}

const register = (e) => {
  e.preventDefault();
  $.post("http://127.0.0.1:3000/user", $("#register").serialize()).done(() => {
    location.reload();
  }).fail((res) => {
    showAlert(res.responseText);
  });
}

const login = (e) => {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:3000/session",
    data: $("#login").serialize()
  }).done(() => {
    location.reload();
  }).fail((res) => {
    showAlert(res.responseText);
  });
}

const logout = (e) => {
  e.preventDefault();
  $.ajax({
    type: "DELETE",
    url: "http://127.0.0.1:3000/session"
  }).done(() => {
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
